"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_NAME_SET = exports.cookieOptions = exports.domain = exports.isProduction = void 0;
const default_1 = __importDefault(require("../../config/default"));
//❓ Determine if the environment is production
exports.isProduction = process.env.NODE_ENV === "production";
// Set the domain based on the environment
exports.domain = exports.isProduction ? default_1.default.host : "localhost";
exports.cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    // domain,
};
exports.COOKIE_NAME_SET = process.env.COOKIE_NAME || "jwt";
