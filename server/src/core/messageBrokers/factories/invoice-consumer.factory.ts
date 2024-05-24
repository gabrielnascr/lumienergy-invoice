import { IInvoiceConsumer, InvoiceConsumer } from "../invoice-consumer";

export class InvoiceConsumerFactory {
  static create(): IInvoiceConsumer {
    return new InvoiceConsumer();
  }
}
