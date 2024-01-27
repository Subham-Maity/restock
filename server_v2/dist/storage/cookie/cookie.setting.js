"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_NAME_SET = exports.cookieOptions = exports.domain = exports.isProduction = void 0;
const default_1 = __importStar(require("../../config/default"));
//❓ Determine if the environment is production
exports.isProduction = process.env.NODE_ENV === "production";
// Set the domain based on the environment
exports.domain = exports.isProduction ? default_1.default.host : "localhost";
exports.cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: exports.isProduction,
    sameSite: exports.isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 3,
    domain: exports.domain,
};
exports.COOKIE_NAME_SET = default_1.COOKIE_NAME;
