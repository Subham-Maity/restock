import { Application } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

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
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again in 15 minutes",
  });

  //  apply to all requests
  app.use(limiter);
};
