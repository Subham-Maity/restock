"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBrand = exports.createBrand = void 0;
const catchAsyncError_1 = __importDefault(require("../../../error/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../../error/errorHandler"));
const brand_model_controller_1 = require("./model-control/brand.model.controller"); /*☑️ CREATE BRAND ☑️ */
/*☑️ CREATE BRAND ☑️ */
exports.createBrand = (0, catchAsyncError_1.default)(async (req, res, _) => {
    const savedBrand = await (0, brand_model_controller_1.saveBrand)(req.body);
    if (!savedBrand) {
        return res.status(400).json({
            status: "fail",
            message: "Failed to create brand",
        });
    }
    res.status(201).json({
        message: "Brand created successfully",
        savedBrand,
    });
});
/*☑️ GET ALL BRANDS ☑️ */
exports.fetchBrand = (0, catchAsyncError_1.default)(async (_, res, next) => {
    const brands = await (0, brand_model_controller_1.fetchAllBrands)();
    if (!brands) {
        return next(new errorHandler_1.default("No brands found", 404));
    }
    res.status(200).json(brands);
});
