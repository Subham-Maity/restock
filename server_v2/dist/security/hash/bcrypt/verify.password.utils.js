"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const verifyPassword = async (password, user) => {
    const match = await bcrypt_1.default.compare(password, user.password);
    return await bcrypt_1.default.compare(password, user.password);
};
exports.verifyPassword = verifyPassword;
