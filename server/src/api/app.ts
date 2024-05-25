import "dotenv/config";
import * as express from "express";
import routes from "./routes";
import { InvoiceServiceFactory } from "../modules/invoice/services/factories/InvoiceServiceFactory";

const app = express();

app.use(express.json());

app.use(routes);

const invoiceService = InvoiceServiceFactory.create();
invoiceService.processInvoicesQueue();

export default app;
