"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = void 0;
// password.utils.ts
const crypto_1 = __importDefault(require("crypto"));
const verifyPassword = async (password, user) => {
    return new Promise((resolve, reject) => {
        crypto_1.default.pbkdf2(password, user.salt, 310000, 32, "sha256", (err, hashedPassword) => {
            if (err)
                reject(err);
            resolve(crypto_1.default.timingSafeEqual(user.password, hashedPassword));
        });
    });
};
exports.verifyPassword = verifyPassword;
