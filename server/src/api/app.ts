import "dotenv/config";
import * as express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

export default app;
