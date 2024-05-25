import * as path from "path";
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

  async publishInvoices(files: Express.Multer.File[]) {
    for (let i = 0; files.length > i; i++) {
      console.log(files[i]);
      await this.invoiceProducer.send({
        buffer: files[i].buffer,
        filename: files[i].originalname,
      });
    }
  }

  async processInvoicesQueue() {
    try {
      await this.invoiceConsumer.consume(async (invoice) => {
        const { buffer, filename } = invoice;

        const invoiceExtractedData =
          await this.pdfParserService.extractInvoiceData(Buffer.from(buffer));
        const invoiceUploadedPath = await this.firebaseStorage.uploadFile(
          "bills",
          Buffer.from(buffer),
          filename
        );

        const data = {
          ...invoiceExtractedData,
          invoicePath: invoiceUploadedPath,
        };
        console.log(data);
      });
    } catch (error) {
      console.error("Erro ao ler as faturas:", error);
    }
  }

  async saveInvoice() {
    // await this.invoiceRepository.createInvoice()
  }
}
