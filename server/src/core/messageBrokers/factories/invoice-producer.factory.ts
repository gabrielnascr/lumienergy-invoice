import { IInvoiceProducer, InvoiceProducer } from "../invoice-producer";

export class InvoiceProduceFactory {
  static create(): IInvoiceProducer {
    return new InvoiceProducer();
  }
}
