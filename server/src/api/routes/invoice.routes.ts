import { Router } from "express";
import * as multer from "multer";

import invoiceController from "../controllers/invoice.controller";

const router = Router();
const upload = multer();

router.post("/", upload.array("invoices"), (req, res) =>
  invoiceController.handleInvoice(req, res)
);

export default router;
