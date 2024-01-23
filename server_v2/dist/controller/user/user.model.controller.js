"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById_Token = exports.findUserByEmail = exports.updateUserById = exports.findUserById = void 0;
const user_model_1 = __importDefault(require("../../model/user/user.model"));
// 💾 Function to find a user by ID
const findUserById = async (id) => {
    try {
        return await user_model_1.default.findById(id);
    }
    catch (error) {
        throw new Error(`Error finding user: ${error.message}`);
    }
};
exports.findUserById = findUserById;
// 💾 Function to update a user
const updateUserById = async (id, updateData) => {
    try {
        return await user_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
    }
    catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};
exports.updateUserById = updateUserById;
//Use it for finding user by email
const findUserByEmail = async (email) => {
    return user_model_1.default.findOne({ email: email });
};
exports.findUserByEmail = findUserByEmail;
//Use it for finding user by id
const findUserById_Token = async (id) => {
    return user_model_1.default.findOne({ id: id });
};
exports.findUserById_Token = findUserById_Token;
