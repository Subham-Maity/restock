"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signPayload = void 0;
// jwt.utils.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signPayload = (payload, secret, options = {}) => {
    try {
        return jsonwebtoken_1.default.sign(payload, secret, options);
    }
    catch (error) {
        throw new Error(`Error signing token: ${error.message}`);
    }
};
exports.signPayload = signPayload;
