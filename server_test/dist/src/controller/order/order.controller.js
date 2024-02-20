"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllOrders = exports.updateOrder = exports.deleteOrder = exports.createOrder = exports.fetchOrdersByUser = void 0;
const catchAsyncError_1 = __importDefault(require("../../../error/catchAsyncError"));
const order_model_controller_1 = require("./model-controller/order.model.controller");
const sort_1 = require("./order-controller/sort");
const paginate_1 = require("./order-controller/paginate");
const order_model_1 = __importDefault(require("../../model/order/order.model")); /*FETCH ALL ORDERS*/
/*☑️ FETCH ALL ORDERS ☑️*/
exports.fetchOrdersByUser = (0, catchAsyncError_1.default)(async (req, res, _) => {
    const { id } = req.user;
    const orders = await (0, order_model_controller_1.findOrdersByUser)(id);
    res.status(200).json(orders);
});
//Todo: Create a new order with Email
/*☑️ Create a new order ☑️*/
exports.createOrder = (0, catchAsyncError_1.default)(async (req, res, _) => {
    const doc = await (0, order_model_controller_1.createNewOrder)(req.body);
    res.status(201).json(doc);
});
/*☑️ Delete an order ☑️*/
exports.deleteOrder = (0, catchAsyncError_1.default)(async (req, res, _) => {
    const { id } = req.params;
    const order = await (0, order_model_controller_1.deleteOrderById)(id);
    res.status(200).json(order);
});
/*☑️ Update an order ☑️*/
exports.updateOrder = (0, catchAsyncError_1.default)(async (req, res) => {
    const { id } = req.params;
    const order = await order_model_1.default.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    res.status(200).json(order);
});
/*☑️ Fetch all orders ☑️*/
exports.fetchAllOrders = (0, catchAsyncError_1.default)(async (req, res, _) => {
    let query = (0, sort_1.buildBaseQuery)(req);
    let totalOrdersQuery = (0, sort_1.buildBaseQuery)(req);
    query = (0, paginate_1.paginateQuery)(query, req);
    const docs = await query.exec();
    const totalDocs = await totalOrdersQuery.countDocuments().exec();
    res.set("X-Total-Count", totalDocs.toString());
    res.status(200).json(docs);
});
