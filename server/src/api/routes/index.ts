import { Router } from "express";
import invoiceRoutes from "./invoice.routes";

const router = Router();

router.use("/invoices", invoiceRoutes);

export default router;
