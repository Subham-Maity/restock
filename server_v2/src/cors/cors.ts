import { Application } from "express";
import cors from "cors";
import {
  credentials,
  development_domain_whitelist,
  exposedHeaders,
  optionsSuccessStatus,
  production_domain_whitelist,
} from "./cors.setting";

function configureCors(app: Application): void {
  let corsSettings;

  if (process.env.NODE_ENV === "development") {
    corsSettings = {
      origin: development_domain_whitelist,
      optionsSuccessStatus: optionsSuccessStatus,
      exposedHeaders: exposedHeaders,
      credentials: credentials,
    };
  } else {
    const whitelist = production_domain_whitelist;
    corsSettings = {
      origin: function (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void,
      ) {
        if (origin && whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      optionsSuccessStatus: optionsSuccessStatus,
      exposedHeaders: exposedHeaders,
      credentials: credentials,
    };
  }
  app.use(cors(corsSettings));
}

export default configureCors;
