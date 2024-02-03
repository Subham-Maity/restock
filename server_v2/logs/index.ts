import log from "../utils/logger/logger";
import { domain, isProduction } from "../storage/cookie/cookie.setting";
import config from "../config/default";
import dotenv from "dotenv";
import { production_domain_whitelist } from "../security/cors/cors.setting";

dotenv.config();
const env = process.env.NODE_ENV || "development";
log.info(
  "You'll get a better idea of where you are in the development/production/test cycle 😈👇",
);
//From cookie.setting.ts
log.info(`Cookie domain: ${domain}`);
log.info(`Cookie Production: ${isProduction}`);

// Default config
log.info(`Port: ${config.port}`);
log.info(`Host: ${config.host}`);
log.info(`Cors urls: ${production_domain_whitelist}`);
log.info(`Database URL: ${config.db}`);
log.info(`Environment: ${env}`);
log.info(`Is Production: ${isProduction}`);
