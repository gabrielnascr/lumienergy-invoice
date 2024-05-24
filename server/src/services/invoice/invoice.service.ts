import { EnergyBillDataExtractor } from "../../core/dataExtractors/energyBillDataExtractor";
import { InvoiceConsumer } from "../../core/messageBrokers/invoice-consumer";
import { InvoiceProducer } from "../../core/messageBrokers/invoice-producer";

export class InvoiceService {
  constructor(
    private readonly invoiceConsumer: InvoiceConsumer,
    private readonly invoiceProducer: InvoiceProducer,
    private readonly energyBillDataExtractor: EnergyBillDataExtractor
  ) {}

  async publishInvoices(invoiceBuffer: Buffer) {
    await this.invoiceProducer.send(invoiceBuffer);
  }

  async processInvoicesQueue() {
    try {
      await this.invoiceConsumer.consume(async (invoice: Buffer) => {
        const invoiceData = await this.energyBillDataExtractor.extract(invoice);
        console.log("INVOICE DATA:", invoiceData);
      });
    } catch (error) {
      console.error("Erro ao ler as faturas:", error);
    }
  }

  async saveInvoice() {}
}
