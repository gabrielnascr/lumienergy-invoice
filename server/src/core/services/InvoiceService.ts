import * as path from "path";
import {
  IInvoiceConsumer,
  InvoiceConsumer,
} from "../messageBrokers/invoice-consumer";
import {
  IInvoiceProducer,
  InvoiceProducer,
} from "../messageBrokers/invoice-producer";
import { FileService } from "./FileService";
import { PdfParserService } from "./PDFParserService";

export class InvoiceService {
  constructor(
    private readonly invoiceConsumer: IInvoiceConsumer,
    private readonly invoiceProducer: IInvoiceProducer,
    private readonly pdfParserService: PdfParserService,
    private readonly fileService: FileService
  ) {}

  async publishInvoices(files: Express.Multer.File[]) {
    for (let i = 0; files.length > i; i++) {
      await this.invoiceProducer.send({
        buffer: files[i].buffer,
        filename: files[i].filename,
      });
    }
  }

  async processInvoicesQueue() {
    try {
      await this.invoiceConsumer.consume(async (invoice) => {
        const { buffer, filename } = invoice;

        const invoiceData = await this.pdfParserService.extractInvoiceData(
          Buffer.from(buffer)
        );
        console.log("INVOICE DATA:", invoiceData);
      });
    } catch (error) {
      console.error("Erro ao ler as faturas:", error);
    }
  }

  async saveInvoice() {}
}
