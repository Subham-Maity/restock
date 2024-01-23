"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCategory = exports.createCategory = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/error/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler/errorHandler"));
const express_validator_1 = require("express-validator");
const category_model_controller_1 = require("./category.model.controller");
/*☑️ CREATE CATEGORY ☑️*/
exports.createCategory = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const savedCategory = await (0, category_model_controller_1.saveCategory)(req.body);
        res.status(201).json({
            message: "Category created successfully",
            savedCategory,
        });
    }
    catch (error) {
        next(error);
    }
});
//*☑️ GET ALL CATEGORIES ☑️*/
exports.fetchCategory = (0, catchAsyncError_1.default)(async (_, res, next) => {
    try {
        const categories = await (0, category_model_controller_1.fetchAllCategories)();
        res.status(200).json(categories);
    }
    catch (error) {
        if (error instanceof errorHandler_1.default) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            next(error);
        }
    }
});
