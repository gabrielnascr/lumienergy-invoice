import { IInvoiceConsumer } from "../messageBrokers/invoice-consumer";
import { IInvoiceProducer } from "../messageBrokers/invoice-producer";
import { PdfParserService } from "../parsers/PDFParserService";
import { FirebaseStorageService } from "../storage/FirebaseStorageService";
import { IInvoiceRepository } from "../repositories/InvoiceRepository";

export class InvoiceService {
  constructor(
    private readonly invoiceConsumer: IInvoiceConsumer,
    private readonly invoiceProducer: IInvoiceProducer,
    private readonly pdfParserService: PdfParserService,
    private readonly firebaseStorage: FirebaseStorageService,
    private readonly invoiceRepository: IInvoiceRepository
  ) {}

  async publishInvoices(files: Express.Multer.File[], userId: string) {
    const batchId = crypto.randomUUID();
    for (let i = 0; files.length > i; i++) {
      await this.invoiceProducer.send({
        buffer: files[i].buffer,
        filename: files[i].originalname,
      });
    }
    await this.processInvoicesQueue(batchId, files.length, userId);
    return {
      batchId: batchId,
    };
  }

  async processInvoicesQueue(
    batchId: string,
    totalFiles: number,
    userId: string
  ) {
    let successInvoices = [];
    let errorInvoices = [];

    try {
      await this.invoiceConsumer.consume(async (invoice) => {
        const { buffer, filename } = invoice;

        try {
          const invoiceExtractedData =
            await this.pdfParserService.extractInvoiceData(Buffer.from(buffer));

          const fileExists = await this.firebaseStorage.fileExists(
            "bills",
            filename
          );
          const existingInvoices =
            await this.invoiceRepository.findInvoiceByCustomerNameAndReferenceMonth(
              invoiceExtractedData.customeNumber,
              invoiceExtractedData.referenceMonth
            );

          if (existingInvoices && fileExists) {
            await this.firebaseStorage.deleteFile("bills", filename);

            for (let i = 0; existingInvoices.length > i; i++) {
              await this.invoiceRepository.deleteInvoice(
                existingInvoices[i].id
              );
            }
          }

          const invoiceUploadedPath = await this.firebaseStorage.uploadFile(
            "bills",
            Buffer.from(buffer),
            filename
          );

          const {
            totalCost,
            address,
            customeNumber,
            customerName,
            expiredData,
            invoiceCosts,
            referenceMonth,
          } = invoiceExtractedData;

          const createdInvoices = await this.invoiceRepository.createInvoice({
            address: {
              create: {
                street: address.street,
                number: address.number,
              },
            },
            invoiceCosts: {
              createMany: {
                data: invoiceCosts.map((invoiceCost) => {
                  const { unit_price, description, kWh, price } = invoiceCost;
                  return {
                    unit_price: unit_price,
                    description: description,
                    kWh: kWh,
                    price: price,
                  };
                }),
              },
            },
            customerName: customerName,
            customeNumber: customeNumber,
            referenceMonth: referenceMonth,
            totalCost: totalCost,
            expiredData: expiredData,
            invoicePath: invoiceUploadedPath,
            admin: {
              connect: {
                id: userId,
              },
            },
          });
          successInvoices.push({
            ...createdInvoices,
          });
        } catch (error) {
          errorInvoices.push(filename);
        }

        if (successInvoices.length + errorInvoices.length === totalFiles) {
          await this.saveProcessingReport(
            batchId,
            totalFiles,
            successInvoices,
            errorInvoices
          );

          successInvoices = [];
          errorInvoices = [];
        }
      });
    } catch (error) {
      await this.saveProcessingReport(
        batchId,
        totalFiles,
        successInvoices,
        errorInvoices
      );
    }
  }

  async saveProcessingReport(
    batchId: string,
    totalFiles: number,
    successInvoices: string[],
    errorInvoices: string[]
  ) {
    const report = {
      id: batchId,
      totalFiles,
      successCount: successInvoices.length,
      errorCount: errorInvoices.length,
      successInvoices,
      errorInvoices,
    };
    // next steps -> save proccess report and send a report to admin, via websocket or something
    console.log(report);
  }

  async getInvoices(
    adminId: string,
    customeNumber?: string,
    customerName?: string,
    referenceMonth?: string
  ) {
    let invoices = await this.invoiceRepository.getAllInvoices(adminId);

    if (customeNumber) {
      invoices = invoices.filter((invoice) =>
        invoice.customeNumber.includes(customeNumber)
      );
    }

    if (customerName) {
      invoices = invoices.filter((invoice) =>
        invoice.customerName.includes(customerName)
      );
    }

    if (referenceMonth) {
      invoices = invoices.filter((invoice) =>
        invoice.referenceMonth.includes(referenceMonth)
      );
    }

    return invoices;
  }

  async getStatistics(adminId: string) {
    const invoices = await this.getInvoices(adminId);

    const statistics = invoices.reduce(
      (acc, invoice) => {
        const consumptionElectricity = invoice.invoiceCosts.reduce(
          (sum, cost) => {
            if (
              cost.description == "Energia Elétrica" ||
              cost.description == "Energia SCEE"
            ) {
              return sum + cost.kWh;
            }
            return sum;
          },
          0
        );

        const energyCompensated = invoice.invoiceCosts.reduce((sum, cost) => {
          if (cost.description === "Energia compensada") {
            return sum + cost.kWh;
          }
          return sum;
        }, 0);

        const valueTotalWithoutEconomy = invoice.invoiceCosts.reduce(
          (sum, cost) => {
            if (
              cost.description === "Energia Elétrica" ||
              cost.description === "Energia SCEE" ||
              cost.description === "Contrib Ilum"
            ) {
              return sum + cost.price;
            }
            return sum;
          },
          0
        );

        const economy = invoice.invoiceCosts.reduce((sum, cost) => {
          if (cost.description === "Energia compensada") {
            return sum + cost.price;
          }
          return sum;
        }, 0);

        acc.consumptionElectricity += consumptionElectricity;
        acc.energyCompensated += energyCompensated;
        acc.valueTotalWithoutEconomy += valueTotalWithoutEconomy;
        acc.economy += economy;

        return acc;
      },
      {
        consumptionElectricity: 0,
        energyCompensated: 0,
        valueTotalWithoutEconomy: 0,
        economy: 0,
      }
    );

    return statistics;
  }
}
