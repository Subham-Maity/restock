"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRATION_TIME = exports.JWT_SECRET_KEY = void 0;
//✅ JWT Secret Key, JWT Expiration Time
exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "SECRET_KEY";
exports.JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "1h";
