import { Application } from "express";
import cors from "cors";
import {
  credentials,
  exposedHeaders,
  optionsSuccessStatus,
} from "./cors.setting";

function configureCors(app: Application): void {
  let corsSettings;

  if (process.env.NODE_ENV === "development") {
    corsSettings = {
      origin: true,
      optionsSuccessStatus: optionsSuccessStatus,
      exposedHeaders: exposedHeaders,
      credentials: credentials,
    };
  } else {
    corsSettings = {
      origin: true,
      optionsSuccessStatus: optionsSuccessStatus,
      exposedHeaders: exposedHeaders,
      credentials: credentials,
    };
  }
  app.use(cors(corsSettings));
}

export default configureCors;
