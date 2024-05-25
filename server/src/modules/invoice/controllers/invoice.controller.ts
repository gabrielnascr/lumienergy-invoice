import { Request, Response } from "express";
import { InvoiceService } from "../services/InvoiceService";
import { InvoiceServiceFactory } from "../services/factories/InvoiceServiceFactory";

class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  async handleInvoice(req: Request, res: Response) {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: "No files uploaded" });
    }

    const files = req.files.map((file) => file);
    await this.invoiceService.publishInvoices(files);
    return res.status(200).send({
      message: "Invoice process start",
    });
  }
}

const invoiceService = InvoiceServiceFactory.create();
export default new InvoiceController(invoiceService);
