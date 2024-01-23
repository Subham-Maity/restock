"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductById = exports.findProductById = exports.saveProduct = exports.checkProductExists = void 0;
const product_model_1 = __importDefault(require("../../model/products/product.model"));
// 💾 Function to check if product already exists(Product Creation)
const checkProductExists = async (title) => {
    try {
        const product = await product_model_1.default.findOne({ title });
        if (product) {
            throw new Error("Product with the same title already exists");
        }
    }
    catch (error) {
        throw new Error(`Error checking product: ${error.message}`);
    }
};
exports.checkProductExists = checkProductExists;
// 💾 Function to save product data(Product Creation)
const saveProduct = async (productData) => {
    try {
        await (0, exports.checkProductExists)(productData.title);
        const product = new product_model_1.default(productData);
        return await product.save();
    }
    catch (error) {
        throw new Error(`Error saving product: ${error.message}`);
    }
};
exports.saveProduct = saveProduct;
// 💾 Function to find a product by ID
const findProductById = async (id) => {
    try {
        return await product_model_1.default.findById(id);
    }
    catch (error) {
        throw new Error(`Error finding product: ${error.message}`);
    }
};
exports.findProductById = findProductById;
// 💾 Function to update a product
const updateProductById = async (id, updateData) => {
    try {
        return await product_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
    }
    catch (error) {
        throw new Error(`Error updating product: ${error.message}`);
    }
};
exports.updateProductById = updateProductById;
