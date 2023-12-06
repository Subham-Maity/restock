import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { corsUrl } from "./config.js";
/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
    res.send("Yes you are connected to the app! ✅");
});
export default app;
//# sourceMappingURL=app.js.map