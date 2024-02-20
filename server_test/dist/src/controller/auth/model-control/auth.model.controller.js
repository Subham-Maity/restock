"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_model_1 = __importDefault(require("../../../model/user/user.model"));
const createUser = async (userData) => {
    const user = new user_model_1.default(userData);
    return await user.save();
};
exports.createUser = createUser;
