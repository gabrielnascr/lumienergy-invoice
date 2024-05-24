import { InvoiceData } from "../../@types";
import { PdfParserService } from "../../services/pdfparser.service";

export interface IEnergyBillDataExtractor {
  extract(pdf: Buffer): Promise<InvoiceData>;
}

export class EnergyBillDataExtractor implements IEnergyBillDataExtractor {
  private readonly pdfService: PdfParserService;
  constructor() {
    this.pdfService = new PdfParserService();
  }

  async extract(pdfBuffer: Buffer): Promise<InvoiceData> {
    return this.pdfService.extractInvoiceData(pdfBuffer);
  }
}
