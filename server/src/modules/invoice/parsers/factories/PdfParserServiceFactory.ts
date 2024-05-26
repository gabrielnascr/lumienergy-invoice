import { PdfParserService } from "../../parsers/PDFParserService";

export class PdfParserServiceFactory {
  static create(): PdfParserService {
    return new PdfParserService();
  }
}
