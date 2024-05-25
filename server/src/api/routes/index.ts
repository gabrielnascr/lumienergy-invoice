import { Router } from "express";

import invoiceRoutes from "../../modules/invoice/routes";
import adminRoutes from "../../modules/admin/routes";

const router = Router();

router.use("/invoices", invoiceRoutes);
router.use("/admin", adminRoutes);

export default router;
