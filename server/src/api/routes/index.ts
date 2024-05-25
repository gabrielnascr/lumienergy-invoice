import { Router } from "express";
import invoiceRoutes from "../../modules/invoice/routes";

const router = Router();

router.use("/invoices", invoiceRoutes);

export default router;
