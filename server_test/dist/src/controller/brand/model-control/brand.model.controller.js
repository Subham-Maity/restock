"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllBrands = exports.saveBrand = void 0;
const brand_model_1 = __importDefault(require("../../../model/brand/brand.model"));
const errorHandler_1 = __importDefault(require("../../../../error/errorHandler"));
// 💾  Function to save brand data
const saveBrand = async (brandData) => {
    try {
        const brand = new brand_model_1.default(brandData);
        return await brand.save();
    }
    catch (error) {
        throw new Error(`Error saving brand: ${error.message}`);
    }
};
exports.saveBrand = saveBrand;
// 💾 Function to fetch all brands
const fetchAllBrands = async () => {
    try {
        const brands = await brand_model_1.default.find({}).exec();
        if (!brands || brands.length === 0) {
            throw new errorHandler_1.default("No brands found", 404);
        }
        return brands;
    }
    catch (error) {
        throw new Error(`Error fetching brands: ${error.message}`);
    }
};
exports.fetchAllBrands = fetchAllBrands;
