"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
        const salt = crypto_1.default.randomBytes(16);
        crypto_1.default.pbkdf2(password, salt, 310000, 32, "sha256", (err, hashedPassword) => {
            if (err)
                reject(err);
            resolve({ salt, hashedPassword });
        });
    });
};
exports.hashPassword = hashPassword;
