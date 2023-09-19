import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan, { FormatFn } from "morgan";
import colors from "colors";
import connectDB from "./config/dbConnection.js";

/* CONFIG */
dotenv.config();
const server: Application = express();
server.use(express.json());
server.use(helmet());
server.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
server.use(morgan("common" as FormatFn));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

/* MONGOOSE SETUP */
const PORT: string | number = process.env.PORT || 8000;
server.get("/", (req: Request, res: Response) => {
  res.send("Yes you are connected to the server! ✅");
});

(async () =>
  await connectDB()
    .then(() => {
      server.listen(PORT, () => {
        console.log(`Server live on: ` + `http://localhost:${PORT}`);
      });
    })
    .catch((err: Error) => {
      console.log("Error: ", err);
      throw new Error(err.message);
    }))();
