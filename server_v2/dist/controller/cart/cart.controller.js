"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartById = exports.deleteProductFromCart = exports.addProductToCart = exports.getCartByUser = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/error/catchAsyncError"));
const express_validator_1 = require("express-validator");
const errorHandler_1 = __importDefault(require("../../utils/errorHandler/errorHandler"));
const cart_model_controller_1 = require("./cart.model.controller");
/*☑️ GET CART BY USER ☑️ */
const getCartByUser = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new errorHandler_1.default(errors
            .array()
            .map((err) => err.msg)
            .join(", "), 400));
    }
    const user = req.user;
    if (!user) {
        return next(new errorHandler_1.default("User not found", 404));
    }
    try {
        const cartItems = await (0, cart_model_controller_1.fetchCartByUser)(user.id);
        if (!cartItems) {
            return next(new errorHandler_1.default("No cart items found for this user", 404));
        }
        res.status(200).json({
            status: "success",
            data: {
                cartItems,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCartByUser = getCartByUser;
const addProductToCart = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new errorHandler_1.default(errors
            .array()
            .map((err) => err.msg)
            .join(", "), 400));
    }
    try {
        // Check if req.user is defined
        if (!req.user) {
            throw new errorHandler_1.default("User is not authenticated", 401);
        }
        const { id } = req.user;
        const cartItem = await (0, cart_model_controller_1.saveCart)({ ...req.body, user: id });
        res.status(201).json({
            status: "success",
            data: {
                cartItem,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};
exports.addProductToCart = addProductToCart;
/*☑️ DELETE FROM CART ☑️ */
exports.deleteProductFromCart = [
    // validation rules
    // controller
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(new errorHandler_1.default(errors
                .array()
                .map((err) => err.msg)
                .join(", "), 400));
        }
        try {
            const { id } = req.params;
            const deletedCartItem = await (0, cart_model_controller_1.deleteCart)(id);
            if (!deletedCartItem) {
                return next(new errorHandler_1.default("No cart item found with this id", 404));
            }
            res.status(200).json({
                status: "success",
                data: {
                    deletedCartItem,
                },
            });
        }
        catch (error) {
            res.status(400).json({
                status: "error",
                message: error.message,
            });
        }
    },
];
/*☑️ UPDATE CART BY ID ☑️ */
exports.updateCartById = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new errorHandler_1.default(errors
            .array()
            .map((err) => err.msg)
            .join(", "), 400));
    }
    const id = req.params.id;
    try {
        const updatedCart = await (0, cart_model_controller_1.updateCart)(id, req.body);
        res.status(200).json(updatedCart);
    }
    catch (error) {
        next(error);
    }
});
