import { InvoiceService } from "../InvoiceService";

import { InvoiceRepository } from "../../repositories/InvoiceRepository";
import { InvoiceConsumerFactory } from "../../messageBrokers/factories/invoice-consumer.factory";
import { InvoiceProduceFactory } from "../../messageBrokers/factories/invoice-producer.factory";
import { PdfParserServiceFactory } from "../../parsers/factories/PdfParserServiceFactory";
import { FirebaseStorageService } from "../../storage/FirebaseStorageService";

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
