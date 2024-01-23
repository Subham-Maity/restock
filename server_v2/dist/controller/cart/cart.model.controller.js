"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCart = exports.deleteCart = exports.fetchCartByUser = exports.saveCart = void 0;
// cart.model.controller.ts
const cart_model_1 = __importDefault(require("../../model/cart/cart.model"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler/errorHandler"));
//Save cart
const saveCart = async (cartData) => {
    try {
        const cart = new cart_model_1.default(cartData);
        const savedCart = await cart.save();
        return await savedCart.populate("product");
    }
    catch (error) {
        throw new errorHandler_1.default(`Error saving cart: ${error.message}`, 400);
    }
};
exports.saveCart = saveCart;
//Fetch cart by user
const fetchCartByUser = async (userId) => {
    try {
        const cartItems = await cart_model_1.default.find({ user: userId }).populate("product");
        if (!cartItems || cartItems.length === 0) {
            throw new errorHandler_1.default("No cart items found for this user", 404);
        }
        return cartItems;
    }
    catch (error) {
        throw new errorHandler_1.default(`Error fetching cart by user: ${error.message}`, 400);
    }
};
exports.fetchCartByUser = fetchCartByUser;
//Delete cart item
const deleteCart = async (cartId) => {
    try {
        const deletedCart = await cart_model_1.default.findByIdAndDelete(cartId);
        if (!deletedCart) {
            throw new errorHandler_1.default("No cart found with this ID", 404);
        }
        return deletedCart;
    }
    catch (error) {
        throw new errorHandler_1.default(`Error deleting cart: ${error.message}`, 400);
    }
};
exports.deleteCart = deleteCart;
//Update cart item
const updateCart = async (cartId, updateData) => {
    try {
        const updatedCart = await cart_model_1.default.findByIdAndUpdate(cartId, updateData, {
            new: true,
        });
        if (!updatedCart) {
            throw new errorHandler_1.default("No cart found with this ID", 404);
        }
        return await cart_model_1.default.findById(updatedCart._id).populate("product");
    }
    catch (error) {
        throw new errorHandler_1.default(`Error updating cart: ${error.message}`, 400);
    }
};
exports.updateCart = updateCart;
