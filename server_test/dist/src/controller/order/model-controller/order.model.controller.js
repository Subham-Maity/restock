"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderById = exports.deleteOrderById = exports.createNewOrder = exports.findOrdersByUser = void 0;
const order_model_1 = __importDefault(require("../../../model/order/order.model"));
const mongoose_1 = require("mongoose");
const errorHandler_1 = __importDefault(require("../../../../error/errorHandler"));
const product_model_1 = __importDefault(require("../../../model/products/product.model"));
const findOrdersByUser = async (userId) => {
    if (!userId || !(0, mongoose_1.isValidObjectId)(userId)) {
        throw new errorHandler_1.default("Invalid User ID", 400);
    }
    return order_model_1.default.find({ user: userId });
};
exports.findOrdersByUser = findOrdersByUser;
// Function to update product stocks
const updateProductStocks = async (orderItems) => {
    for (let item of orderItems) {
        let product = await product_model_1.default.findOne({ _id: item.product.id });
        if (product) {
            // Check if the product is not null
            product.$inc("stock", -1 * item.quantity);
            await product.save();
        }
    }
};
// Function to create a new order
const createNewOrder = async (orderData) => {
    const order = new order_model_1.default(orderData);
    await updateProductStocks(order.items);
    return await order.save();
};
exports.createNewOrder = createNewOrder;
// Function to delete an order
const deleteOrderById = async (orderId) => {
    const order = await order_model_1.default.findByIdAndDelete(orderId);
    if (!order) {
        throw new errorHandler_1.default("Order not found", 404);
    }
    return order;
};
exports.deleteOrderById = deleteOrderById;
// Function to update an order
const updateOrderById = async (orderId, updateData) => {
    // Check if the order exists in the database or not
    const order = await order_model_1.default.findByIdAndUpdate(orderId, updateData, {
        new: true,
    });
    if (!order) {
        throw new errorHandler_1.default("Order not found", 404);
    }
    return order;
};
exports.updateOrderById = updateOrderById;
