import * as pdf from "pdf-parse";
import { IRegexExtractor } from "../dataExtractors/IRegexExtractor";
import { InvoiceDataExtractor } from "../dataExtractors/InvoiceDataExtractor";
import { InvoiceCostExtractor } from "../dataExtractors/InvoiceCostExtractor";
import { InvoiceData } from "../../../@types";
import { InvoiceCost } from "@prisma/client";

export class PdfParserService {
  private invoiceDataExtractor: IRegexExtractor<Partial<InvoiceData>>;
  private invoiceCostExtractor: IRegexExtractor<InvoiceCost[]>;

  constructor() {
    this.invoiceDataExtractor = new InvoiceDataExtractor();
    this.invoiceCostExtractor = new InvoiceCostExtractor();
  }

  async extractInvoiceData(pdfBuffer: Buffer): Promise<InvoiceData> {
    try {
      const data = await pdf(pdfBuffer);
      const invoice = this.invoiceDataExtractor.extract(data.text);
      const invoiceCosts = this.invoiceCostExtractor.extract(data.text);
      return { ...invoice, invoiceCosts } as InvoiceData;
    } catch (error) {
      throw error;
    }
  }
}
