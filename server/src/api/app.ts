import "dotenv/config";
import * as express from "express";
import routes from "./routes";
import * as cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
