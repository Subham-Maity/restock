"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllCategories = exports.saveCategory = void 0;
const category_model_1 = __importDefault(require("../../model/category/category.model"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler/errorHandler"));
// 💾  Function to save category data
const saveCategory = async (categoryData) => {
    try {
        const category = new category_model_1.default(categoryData);
        return await category.save();
    }
    catch (error) {
        throw new Error(`Error saving category: ${error.message}`);
    }
};
exports.saveCategory = saveCategory;
// 💾 Function to fetch all categories
const fetchAllCategories = async () => {
    try {
        const categories = await category_model_1.default.find({}).exec();
        if (!categories || categories.length === 0) {
            throw new errorHandler_1.default("No categories found", 404);
        }
        return categories;
    }
    catch (error) {
        throw new Error(`Error fetching categories: ${error.message}`);
    }
};
exports.fetchAllCategories = fetchAllCategories;
