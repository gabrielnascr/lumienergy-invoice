import { IEnergyBillDataExtractor } from "../../core/dataExtractors/energyBillDataExtractor";
import { InvoiceProducer } from "../../core/messageBrokers/invoice-producer";
import { Request, Response } from "express";
import { InvoiceService } from "../../services/invoice/invoice.service";

export class InvoiceControler {
  constructor(private invoiceService: InvoiceService) {}

  async handleInvoice(req: Request, res: Response) {
    if (!req.file?.buffer) {
      return res.status(400).send({ message: "No buffer data" });
    }
    await this.invoiceService.publishInvoices(req.file?.buffer);
    return res.status(200).send({
      message: "Invoice process start",
    });
  }
}
