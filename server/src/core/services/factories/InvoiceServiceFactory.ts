import { InvoiceService } from "../InvoiceService";
import { PdfParserServiceFactory } from "./PdfParserServiceFactory";
import { InvoiceConsumerFactory } from "../../../core/messageBrokers/factories/invoice-consumer.factory";
import { InvoiceProduceFactory } from "../../../core/messageBrokers/factories/invoice-producer.factory";
import { FileServiceFactory } from "./FileServiceFactory";

export class InvoiceServiceFactory {
  static create(): InvoiceService {
    return new InvoiceService(
      InvoiceConsumerFactory.create(),
      InvoiceProduceFactory.create(),
      PdfParserServiceFactory.create(),
      FileServiceFactory.create()
    );
  }
}
