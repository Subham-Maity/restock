"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.fetchUserById = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/error/catchAsyncError"));
const mongoose_1 = require("mongoose");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler/errorHandler"));
const user_model_controller_1 = require("./user.model.controller");
/*☑️ Fetch User By Id ☑️*/
exports.fetchUserById = (0, catchAsyncError_1.default)(async (req, res, next) => {
    try {
        const { id } = req.user;
        // Check if the provided ID is valid
        if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
            return next(new errorHandler_1.default("Invalid user ID", 400));
        }
        const user = await (0, user_model_controller_1.findUserById)(id);
        if (!user) {
            return next(new errorHandler_1.default("User not found", 404));
        }
        res.status(200).json({
            id: user.id,
            addresses: user.addresses,
            email: user.email,
            role: user.role,
        });
    }
    catch (error) {
        if (error instanceof errorHandler_1.default) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            next(new errorHandler_1.default("Internal server error", 500));
        }
    }
});
/*☑️ UPDATE USER ☑️ */
exports.updateUser = (0, catchAsyncError_1.default)(async (req, res, next) => {
    try {
        const { id } = req.params;
        // Check if the provided ID is valid
        if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
            return next(new errorHandler_1.default("Invalid user ID", 400));
        }
        const updatedUser = await (0, user_model_controller_1.updateUserById)(id, req.body);
        if (!updatedUser) {
            return next(new errorHandler_1.default("User not found", 404));
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        if (error instanceof errorHandler_1.default) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            next(new errorHandler_1.default("Internal server error", 500));
        }
    }
});
