import { PdfParserService } from "../PDFParserService";

export class PdfParserServiceFactory {
  static create(): PdfParserService {
    return new PdfParserService();
  }
}
