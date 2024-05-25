import { InvoiceService } from "../InvoiceService";

import { InvoiceConsumerFactory } from "../../../core/messageBrokers/factories/invoice-consumer.factory";
import { InvoiceProduceFactory } from "../../../core/messageBrokers/factories/invoice-producer.factory";
import { FirebaseStorageService } from "../../../core/storage/FirebaseStorageService";
import { PdfParserServiceFactory } from "../../parsers/factories/PdfParserServiceFactory";
import { InvoiceRepository } from "src/core/repositories/InvoiceRepository";

export class InvoiceServiceFactory {
  static create(): InvoiceService {
    return new InvoiceService(
      InvoiceConsumerFactory.create(),
      InvoiceProduceFactory.create(),
      PdfParserServiceFactory.create(),
      new FirebaseStorageService(),
      new InvoiceRepository()
    );
  }
}
