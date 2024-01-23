"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBrand = exports.createBrand = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/error/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler/errorHandler"));
const express_validator_1 = require("express-validator");
const brand_model_controller_1 = require("./brand.model.controller"); /*☑️ CREATE BRAND ☑️ */
/*☑️ CREATE BRAND ☑️ */
exports.createBrand = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const savedBrand = await (0, brand_model_controller_1.saveBrand)(req.body);
        res.status(201).json({
            message: "Brand created successfully",
            savedBrand,
        });
    }
    catch (error) {
        next(error);
    }
});
/*☑️ GET ALL BRANDS ☑️ */
exports.fetchBrand = (0, catchAsyncError_1.default)(async (_, res, next) => {
    try {
        const brands = await (0, brand_model_controller_1.fetchAllBrands)();
        res.status(200).json(brands);
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
