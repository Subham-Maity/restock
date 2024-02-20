"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCategory = exports.createCategory = void 0;
const catchAsyncError_1 = __importDefault(require("../../../error/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../../error/errorHandler"));
const category_model_controller_1 = require("./model-control/category.model.controller");
/*☑️ CREATE CATEGORY ☑️*/
exports.createCategory = (0, catchAsyncError_1.default)(async (req, res, _) => {
    const savedCategory = await (0, category_model_controller_1.saveCategory)(req.body);
    if (!savedCategory) {
        return res.status(400).json({
            status: "fail",
            message: "Failed to create category",
        });
    }
    res.status(201).json({
        message: "Category created successfully",
        savedCategory,
    });
});
//*☑️ GET ALL CATEGORIES ☑️*/
exports.fetchCategory = (0, catchAsyncError_1.default)(async (_, res, next) => {
    const categories = await (0, category_model_controller_1.fetchAllCategories)();
    if (!categories) {
        return next(new errorHandler_1.default("No categories found", 404));
    }
    res.status(200).json(categories);
});
