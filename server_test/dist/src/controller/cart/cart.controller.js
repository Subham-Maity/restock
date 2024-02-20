"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartById = exports.deleteProductFromCart = exports.addProductToCart = exports.getCartByUser = void 0;
const catchAsyncError_1 = __importDefault(require("../../../error/catchAsyncError"));
const cart_model_controller_1 = require("./model-control/cart.model.controller");
const errorHandler_1 = __importDefault(require("../../../error/errorHandler"));
const mongoose_1 = require("mongoose");
/*☑️ GET CART BY USER ☑️ */
exports.getCartByUser = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const { id } = req.user;
    // Check if the provided ID is valid
    if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
        return next(new errorHandler_1.default("Invalid cart ID", 400));
    }
    const cartItems = await (0, cart_model_controller_1.fetchCartByUser)(id);
    if (!cartItems) {
        return next(new errorHandler_1.default("Cart items not found", 404));
    }
    res.status(200).json(cartItems);
});
/*☑️ ADD TO CART ☑️ */
exports.addProductToCart = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const { id } = req.user;
    // Check if the provided ID is valid
    if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
        return next(new errorHandler_1.default("Invalid cart ID", 400));
    }
    const cartItem = await (0, cart_model_controller_1.saveCart)({ ...req.body, user: id });
    if (!cartItem) {
        return res.status(400).json({
            status: "fail",
            message: "Failed to add product to cart",
        });
    }
    res.status(201).json(cartItem);
});
/*☑️ DELETE FROM CART ☑️ */
exports.deleteProductFromCart = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    // Check if the provided ID is valid
    if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
        return next(new errorHandler_1.default("Invalid cart ID", 400));
    }
    const deletedCartItem = await (0, cart_model_controller_1.deleteCart)(id);
    if (!deletedCartItem) {
        return next(new errorHandler_1.default("No cart item found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            deletedCartItem,
        },
    });
});
/*☑️ UPDATE CART BY ID ☑️ */
exports.updateCartById = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const id = req.params.id;
    // Check if the provided ID is valid
    if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
        return next(new errorHandler_1.default("Invalid cart ID", 400));
    }
    const updatedCart = await (0, cart_model_controller_1.updateCart)(id, req.body);
    if (!updatedCart) {
        return res.status(400).json({
            status: "fail",
            message: "Failed to update cart",
        });
    }
    res.status(200).json(updatedCart);
});
