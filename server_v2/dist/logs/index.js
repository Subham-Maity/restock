"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger/logger"));
const cookie_setting_1 = require("../storage/cookie/cookie.setting");
const default_1 = __importDefault(require("../config/default"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env.NODE_ENV || "development";
logger_1.default.info("You'll get a better idea of where you are in the development/production/test cycle 😈👇");
//From cookie.setting.ts
logger_1.default.info(`Cookie domain: ${cookie_setting_1.domain}`);
logger_1.default.info(`Cookie Production: ${cookie_setting_1.isProduction}`);
// Default config
logger_1.default.info(`Port: ${default_1.default.port}`);
logger_1.default.info(`Host: ${default_1.default.host}`);
logger_1.default.info(`CORS Origin: ${default_1.default.corsOrigin}`);
logger_1.default.info(`Database URL: ${default_1.default.db}`);
logger_1.default.info(`Environment: ${env}`);
logger_1.default.info(`Is Production: ${cookie_setting_1.isProduction}`);
