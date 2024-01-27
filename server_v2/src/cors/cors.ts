import { Application } from "express";
import cors from "cors";
import {
  cors_origin,
  credentials,
  exposedHeaders,
  optionsSuccessStatus,
} from "./cors.setting";

function configureCors(app: Application): void {
  const corsSettings = {
    origin: cors_origin,
    optionsSuccessStatus: optionsSuccessStatus,
    exposedHeaders: exposedHeaders,
    credentials: credentials,
  };

  app.use(cors(corsSettings));
}

export default configureCors;
