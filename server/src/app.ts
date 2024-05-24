import "dotenv/config";
import * as express from "express";
import routes from "./api/routes";

import { createInvoiceService } from "./services/invoice/invoice.service.factory";

const app = express();

app.use(express.json());

app.use(routes);

const invoiceService = createInvoiceService();
invoiceService.processInvoicesQueue();
export default app;
