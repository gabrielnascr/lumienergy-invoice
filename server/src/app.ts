import "dotenv/config";
import * as express from "express";
import routes from "./api/routes";
import { InvoiceServiceFactory } from "./core/services/factories/InvoiceServiceFactory";

const app = express();

app.use(express.json());

app.use(routes);

const invoiceService = InvoiceServiceFactory.create();
invoiceService.processInvoicesQueue();

export default app;
