"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.calculateDiscountPrice = exports.fetchProductById = exports.fetchProduct = exports.createProduct = void 0;
const catchAsyncError_1 = __importDefault(require("../../../error/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../../error/errorHandler"));
const product_model_1 = __importDefault(require("../../model/products/product.model"));
const product_model_controller_1 = require("./model-control/product.model.controller");
const mongoose_1 = require("mongoose");
const paginate_1 = require("./product-control/paginate");
const search_text_regex_1 = require("./product-control/search-text-regex");
const sort_1 = require("./product-control/sort");
const filter_1 = require("./product-control/filter");
const admin_only_1 = require("./product-control/admin-only");
/*☑️ CREATE PRODUCT ☑️ */
exports.createProduct = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const savedProduct = await (0, product_model_controller_1.saveProduct)(req.body);
    if (!savedProduct) {
        return res.status(400).json({
            status: "fail",
            message: "Failed to create product",
        });
    }
    res.status(201).json({
        message: "Product created successfully",
        savedProduct,
    });
});
/*☑️ Filtering, Sorting, Pagination on Product ☑️*/
/**
 Filtering the products based on the query parameters
 Sort Example = {_sort: 'price', _order: 'asc'} or {_sort: 'price', _order: 'desc'}
 Filter Example  = {"category": ["smartphone", "laptop"]} or {"brand": ["apple", "samsung"]}
 Pagination Example = {_page: 1, _limit: 20} or {_page: 2, _limit: 20}
 */
//🔥 Fetching all products with filtering, sorting, pagination
exports.fetchProduct = (0, catchAsyncError_1.default)(async (req, res, next) => {
    //filtering the products based on the query parameters
    let condition = (0, admin_only_1.buildCondition)(req);
    /* TODO: will add the redis feature here
    //Redis
    // Generate a unique key for this query based on the query parameters
    // in redis we will store the data based on this key, and when we will
    // fetch the data, we will use this key
    const baseKey = generateBaseKey(req.query);

    // Generate a unique key for this query based on the query parameters
    // in redis we will store the data based on this key and when we will
    // fetch the data, we will use this key
    const queryKey = generateUniqueKey(condition, req.query, baseKey);

    let docs = await getFromRedis(queryKey);

    if (docs) {
      return res.status(200).json(docs);
    }
   */
    // Initialize the query without executing it - Purpose: Deleted false products won't show up on the frontend
    // It will be used for pagination, filtering and sorting
    let query = product_model_1.default.find(condition);
    //This will use it for pagination (X-Total-Count)
    let totalProductsQuery = product_model_1.default.find(condition);
    //filtering the products based on the query parameters - filtering
    query = (0, filter_1.filterProducts)(query, req);
    //sorting the products based on the query parameters - sorting
    totalProductsQuery = (0, filter_1.filterProducts)(totalProductsQuery, req);
    //sorting the products based on the query parameters - sorting
    query = (0, sort_1.sortProducts)(query, req);
    //pagination of the products based on the query parameters - pagination
    query = (0, paginate_1.paginateProducts)(query, req);
    //searching the products based on the query parameters - searching
    query = (0, search_text_regex_1.searchProducts_Text_Regex)(query, req);
    //executing the query and getting the products
    /* TODO: will add the redis feature here
    //Redis
    docs = await query.exec();
    */
    //if redis is used then comment the below line
    const docs = await query.exec();
    //executing the query and getting the products - It will be used for pagination (X-Total-Count)
    const totalDocs = await totalProductsQuery.countDocuments().exec();
    //setting the header for pagination (X-Total-Count)
    res.set("X-Total-Count", totalDocs.toString());
    //if no products found then return error
    if (docs.length === 0) {
        return next(new errorHandler_1.default("No products found", 404));
    }
    /* TODO: will add the redis feature here
    // Store the result in Redis for future queries
    await setInRedis(queryKey, docs, 3600); // 1 hour
    
    */
    //returning the products
    res.status(200).json(docs);
});
/*☑️ FETCHING A SINGLE PRODUCT ☑️ */
//Fetching a single product
exports.fetchProductById = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    // Check if the provided ID is valid
    if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
        return next(new errorHandler_1.default("Invalid product ID", 400));
    }
    const product = await (0, product_model_controller_1.findProductById)(id);
    if (!product) {
        throw new errorHandler_1.default("Product not found", 404);
    }
    res.status(200).json(product);
});
/*☑️ UPDATE PRODUCT ☑️ */
// Function to calculate the discount price
const calculateDiscountPrice = async (product) => {
    return Math.round(product.price * (1 - (product.discountPercentage || 0) / 100));
};
exports.calculateDiscountPrice = calculateDiscountPrice;
// Update product
exports.updateProduct = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    // Check if the provided ID is valid
    if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
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
});
