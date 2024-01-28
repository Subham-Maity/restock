"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.calculateDiscountPrice = exports.fetchProductById = exports.fetchProduct = exports.createProduct = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/error/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler/errorHandler"));
const product_model_1 = __importDefault(require("../../model/products/product.model"));
const appError_1 = __importDefault(require("../../middleware/error/appError"));
const express_validator_1 = require("express-validator");
const product_model_controller_1 = require("./product.model.controller");
const useRedis_1 = require("../../storage/redis/useRedis");
const product_key_redis_1 = require("../../storage/redis/key/product-key-redis");
/*☑️ CREATE PRODUCT ☑️ */
exports.createProduct = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //this save product function is in the product.model.ts
        //it will check if the product is already in the database or not
        const savedProduct = await (0, product_model_controller_1.saveProduct)(req.body);
        res.status(201).json({
            message: "Product created successfully",
            savedProduct,
        });
    }
    catch (error) {
        next(error);
    }
});
/*☑️ PRODUCT OPERATIONS ☑️ */
//Testing URL: http://localhost:5050/products?category=fragrances&brand=Samsung&_sort=price&_order=asc&_page=1&_limit=2
//custom error class for product not found*/
class ProductNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}
/*☑️ Filtering, Sorting, Pagination on Product ☑️*/
/**
 Filtering the products based on the query parameters
 Sort Example = {_sort: 'price', _order: 'asc'} or {_sort: 'price', _order: 'desc'}
 Filter Example  = {"category": ["smartphone", "laptop"]} or {"brand": ["apple", "samsung"]}
 Pagination Example = {_page: 1, _limit: 20} or {_page: 2, _limit: 20}
 */
//Use for admin if admin is true then show all products including deleted products
const buildCondition = (req) => {
    let condition = {};
    if (!req.query.admin) {
        condition.deleted = { $ne: true };
    }
    return condition;
};
//🔥 Searching the products
//Faster than regex search but only works with text indexes
const searchProducts_Text = (query, req) => {
    if (req.query.q) {
        query = query.where({ $text: { $search: req.query.q } });
    }
    return query;
};
//Slower than text search but works without text indexes and can search for partial words
const searchProducts_Regex = (query, req) => {
    if (req.query.q) {
        const regex = new RegExp(req.query.q, "i"); // 'i' makes it case-insensitive
        query = query.where({
            $or: [
                { title: regex },
                { description: regex },
                { brand: regex },
                { category: regex },
            ],
        });
    }
    return query;
};
//Try $text search first, if no results then fall back to regex search
//Slower than text search but better than regex search
// and works without text indexes and can search for partial words
const searchProducts_Text_Regex = (query, req) => {
    if (req.query.q) {
        // Try $text search first
        const textSearchQuery = query
            .clone()
            .where({ $text: { $search: req.query.q } });
        // If no results from $text search, fall back to regex search
        const regex = new RegExp(req.query.q, "i"); // 'i' makes it case insensitive
        query = query.where({
            $or: [
                { title: regex },
                { description: regex },
                { brand: regex },
                { category: regex },
            ],
        });
    }
    return query;
};
//🔥 Filtering the products
const filterProducts = (query, req) => {
    if (req.query.category) {
        //example: query.where({category: ["smartphone", "laptop"]})
        //if we get the category query parameter, we will filter the products based on the category
        query = query.where({ category: req.query.category });
    }
    if (req.query.brand) {
        query = query.where({ brand: req.query.brand });
    }
    return query;
};
//🔥 Sorting the products
const sortProducts = (query, req) => {
    if (req.query._sort && req.query._order) {
        const sortKey = req.query._sort;
        const sortOrder = req.query._order;
        const sortCriteria = {};
        sortCriteria[sortKey] = sortOrder;
        query = query.sort(sortCriteria);
    }
    return query;
};
//🔥 Pagination of products
const paginateProducts = (query, req) => {
    if (req.query._page && req.query._limit) {
        const pageSize = parseInt(req.query._limit);
        const page = parseInt(req.query._page);
        query = query.skip((page - 1) * pageSize).limit(pageSize);
    }
    return query;
};
//🔥 Fetching all products with filtering, sorting, pagination
exports.fetchProduct = (0, catchAsyncError_1.default)(async (req, res, next) => {
    try {
        //filtering the products based on the query parameters
        let condition = buildCondition(req);
        //Redis
        // Generate a unique key for this query based on the query parameters
        console.log("condition", JSON.stringify(req.query));
        // Generate a unique key for this query based on the query parameters
        // in redis we will store the data based on this key and when we will
        // fetch the data, we will use this key
        const baseKey = (0, product_key_redis_1.generateBaseKey)(req.query);
        // Generate a unique key for this query based on the query parameters
        // in redis we will store the data based on this key and when we will
        // fetch the data, we will use this key
        const queryKey = (0, useRedis_1.generateUniqueKey)(condition, req.query, baseKey);
        let docs = await (0, useRedis_1.getFromRedis)(queryKey);
        if (docs) {
            return res.status(200).json(docs);
        }
        // Initialize the query without executing it - Purpose: Deleted false products won't show up on the frontend
        // It will be used for pagination, filtering and sorting
        let query = product_model_1.default.find(condition);
        //This will use it for pagination (X-Total-Count)
        let totalProductsQuery = product_model_1.default.find(condition);
        //filtering the products based on the query parameters - filtering
        query = filterProducts(query, req);
        //sorting the products based on the query parameters - sorting
        totalProductsQuery = filterProducts(totalProductsQuery, req);
        //sorting the products based on the query parameters - sorting
        query = sortProducts(query, req);
        //pagination of the products based on the query parameters - pagination
        query = paginateProducts(query, req);
        //searching the products based on the query parameters - searching
        query = searchProducts_Text_Regex(query, req);
        //executing the query and getting the products
        docs = await query.exec();
        //executing the query and getting the products - It will be used for pagination (X-Total-Count)
        const totalDocs = await totalProductsQuery.countDocuments().exec();
        //setting the header for pagination (X-Total-Count)
        res.set("X-Total-Count", totalDocs.toString());
        //if no products found then return error
        if (docs.length === 0) {
            return next(new appError_1.default("No products found", 404));
        }
        // Store the result in Redis for future queries
        await (0, useRedis_1.setInRedis)(queryKey, docs, 3600); // 1 hour
        //returning the products
        res.status(200).json(docs);
    }
    catch (error) {
        if (error instanceof ProductNotFoundError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            next(error);
        }
    }
});
/*☑️ FETCHING A SINGLE PRODUCT ☑️ */
//custom error class for product not found*/
class ProductNotFoundError2 extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}
//Fetching a single product
exports.fetchProductById = (0, catchAsyncError_1.default)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await (0, product_model_controller_1.findProductById)(id);
        if (!product) {
            throw new ProductNotFoundError2("Product not found");
        }
        res.status(200).json(product);
    }
    catch (error) {
        if (error instanceof ProductNotFoundError2) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            next(error);
        }
    }
});
/*☑️ UPDATE PRODUCT ☑️ */
// Helper function to check if ID is a valid ObjectId
function isValidObjectId(id) {
    // Use your preferred method to validate ObjectId (e.g., using mongoose.Types.ObjectId.isValid)
    // For example:
    // return mongoose.Types.ObjectId.isValid(id);
    return /^[0-9a-fA-F]{24}$/.test(id); // Simplified check (24-character hex string)
}
// Function to calculate the discount price
const calculateDiscountPrice = async (product) => {
    return Math.round(product.price * (1 - (product.discountPercentage || 0) / 100));
};
exports.calculateDiscountPrice = calculateDiscountPrice;
// Update product
exports.updateProduct = (0, catchAsyncError_1.default)(async (req, res, next) => {
    try {
        const { id } = req.params;
        // Check if the provided ID is valid
        if (!id || !isValidObjectId(id)) {
            return next(new errorHandler_1.default("Invalid product ID", 400));
        }
        const updatedProduct = await (0, product_model_controller_1.updateProductById)(id, req.body);
        if (!updatedProduct) {
            return next(new errorHandler_1.default("Product not found", 404));
        }
        // Calculate discountPrice if necessary
        if ("price" in req.body || "discountPercentage" in req.body) {
            updatedProduct.discountPrice =
                await (0, exports.calculateDiscountPrice)(updatedProduct);
            await updatedProduct.save();
        }
        res.status(200).json(updatedProduct);
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
