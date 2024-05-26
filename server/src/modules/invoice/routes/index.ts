import { Router } from "express";
import * as multer from "multer";

import invoiceController from "../controllers/invoice.controller";

const router = Router();
const upload = multer();

router.post("/", upload.array("invoices"), (req, res, next) =>
  invoiceController.handleInvoice(req, res, next)
);

router.get("/", (req, res, next) =>
  invoiceController.getInvoices(req, res, next)
);

router.get("/statistics", (req, res, next) =>
  invoiceController.statistics(req, res, next)
);

export default router;
