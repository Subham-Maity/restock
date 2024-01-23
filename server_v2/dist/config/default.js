"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_NAME = exports.JWT_EXPIRATION_TIME = exports.JWT_SECRET_KEY = exports.Passport_Session_Secret = exports.corsUrl = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 5050, // You can remove the default value
    host: process.env.HOST || "localhost", // You can remove the default value
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000", // You can remove the default value
    db: process.env.MONGO_URL,
};
//✅ Port and CORS URL - Use in server.ts
exports.port = process.env.PORT || 5050; // You can remove the default value
exports.corsUrl = process.env.CORS_URL || "http://localhost:3000"; // You can remove the default value
exports.Passport_Session_Secret = process.env.SESSION_SECRET || "keyboard cat";
exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "SECRET_KEY";
exports.JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "1h";
exports.COOKIE_NAME = process.env.COOKIE_NAME || "jwt";
