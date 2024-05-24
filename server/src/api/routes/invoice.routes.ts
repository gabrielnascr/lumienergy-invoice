import { Router } from "express";
import * as multer from "multer";

import { createInvoiceService } from "../../services/invoice/invoice.service.factory";

import { InvoiceControler } from "../controllers/invoice.controller";

const invoiceControler = new InvoiceControler(createInvoiceService());

const router = Router();
const upload = multer();

router.post(
  "/",
  upload.single("pdf"),
  async (req, res) => await invoiceControler.handleInvoice(req, res)
);

export default router;
