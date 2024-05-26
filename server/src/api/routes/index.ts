import { Router } from "express";

import invoiceRoutes from "../../modules/invoice/routes";
import adminRoutes from "../../modules/admin/routes";
import { errorHandlerMiddleware } from "../middlewares/errorHandler";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use("/invoices", authMiddleware, invoiceRoutes);
router.use("/admin", adminRoutes);

router.use(errorHandlerMiddleware);

export default router;
