import { InvoiceConsumer } from "../../core/messageBrokers/invoice-consumer";
import { InvoiceProducer } from "../../core/messageBrokers/invoice-producer";
import { EnergyBillDataExtractor } from "../../core/dataExtractors/energyBillDataExtractor";
import { InvoiceService } from "./invoice.service";

export function createInvoiceService(): InvoiceService {
  return new InvoiceService(
    new InvoiceConsumer(),
    new InvoiceProducer(),
    new EnergyBillDataExtractor()
  );
}
