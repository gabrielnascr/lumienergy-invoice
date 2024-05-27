import { NextFunction, Request, Response } from "express";
import { InvoiceService } from "../services/InvoiceService";
import { InvoiceServiceFactory } from "../services/factories/InvoiceServiceFactory";

class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  async handleInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).send({ message: "No files uploaded" });
      }
      const files = req.files.map((file) => file);
      const batch = await this.invoiceService.publishInvoices(
        files,
        req.user.userId
      );
      return res.send(batch);
    } catch (error) {
      next(error);
    }
  }

  async getInvoices(req: Request, res: Response, next: NextFunction) {
    const { customerNumber, customerName, referenceMonth } = req.query as {
      customerNumber: string;
      customerName: string;
      referenceMonth: string;
    };

    try {
      const invoices = await this.invoiceService.getInvoices(
        req.user.userId,
        customerNumber,
        customerName,
        referenceMonth
      );
      return res.json(invoices);
    } catch (error) {
      next(error);
    }
  }

  async statistics(req: Request, res: Response, next: NextFunction) {
    try {
      const adminId = req.user.userId;
      const statistics = await this.invoiceService.getStatistics(adminId);
      return res.send(statistics);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const adminId = req.user.userId;
      const invoiceId = req.params.id;
      return await this.invoiceService.delete(invoiceId);
    } catch (error) {
      next(error);
    }
  }
}

const invoiceService = InvoiceServiceFactory.create();
export default new InvoiceController(invoiceService);
