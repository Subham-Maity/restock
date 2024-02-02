import { Application } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import {
  helmet_rate_limit_max,
  helmet_rate_limit_message,
  helmet_rate_limit_windowMs,
} from "./helmet.setting";

export const setupSecurity = (app: Application) => {
  // Use Helmet to set security-related HTTP headers
  app.use(helmet());

  // Set Cross-Origin Resource Policy
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

  // Use HTTP Strict Transport Security (HSTS) to force clients to use HTTPS
  app.use(helmet.hsts());

  // Prevents clickjacking attacks by setting the X-Frame-Options header
  app.use(helmet.frameguard({ action: "deny" }));

  // Protect against Cross-Site Scripting (XSS) attacks by setting the X-XSS-Protection header
  app.use(helmet.xssFilter());

  // Rate limiting to limit repeated requests to API endpoints and/or endpoints such as login
  const limiter = rateLimit({
    windowMs: helmet_rate_limit_windowMs, // 15 minutes
    limit: helmet_rate_limit_max,
    message: helmet_rate_limit_message,
  });

  //  apply to all requests
  app.use(limiter);
};
