"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_NAME = exports.JWT_EXPIRATION_TIME = exports.JWT_SECRET_KEY = exports.Passport_Session_Secret = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//❓ Check if the NODE_ENV is set, default to 'development'
const env = process.env.NODE_ENV || "development";
// Load environment variables from the corresponding .env file
if (env === "production") {
    dotenv_1.default.config({ path: ".env.prod" });
}
else {
    dotenv_1.default.config({ path: ".env.dev" });
}
//✅ Port, Host, CORS Origin, and Database URL
exports.default = {
    port: process.env.PORT || 5050,
    host: process.env.HOST || "localhost",
    corsOrigin: process.env.CORS_URL,
    db: process.env.MONGO_URL,
};
//✅ Passport Session Secret - Use in passport.ts
exports.Passport_Session_Secret = process.env.SESSION_SECRET || "keyboard cat";
//✅ JWT Secret Key, JWT Expiration Time
exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "SECRET_KEY";
exports.JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "1h";
//✅ Cookie Name - Use in cookie.config.ts
exports.COOKIE_NAME = process.env.COOKIE_NAME || "jwt";
