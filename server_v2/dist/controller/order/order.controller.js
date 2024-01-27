"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllOrders = exports.updateOrder = exports.deleteOrder = exports.createOrder = exports.fetchOrdersByUser = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/error/catchAsyncError"));
const order_model_1 = __importDefault(require("../../model/order/order.model")); /*FETCH ALL ORDERS*/
/*FETCH ALL ORDERS*/
exports.fetchOrdersByUser = (0, catchAsyncError_1.default)(async (req, res, next) => {
    //@ts-ignore
    const { id } = req.user;
    try {
        const orders = await order_model_1.default.find({ user: id });
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
/*Create a new order*/
exports.createOrder = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const order = new order_model_1.default(req.body);
    try {
        const doc = await order.save();
        res.status(201).json(doc);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
/*Delete an order*/
exports.deleteOrder = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    try {
        const order = await order_model_1.default.findByIdAndDelete(id);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
/*Update an order*/
exports.updateOrder = (0, catchAsyncError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    try {
        const order = await order_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(order);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.fetchAllOrders = (0, catchAsyncError_1.default)(async (req, res, next) => {
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    let query = order_model_1.default.find({ deleted: { $ne: true } });
    let totalOrdersQuery = order_model_1.default.find({ deleted: { $ne: true } });
    if (req.query._sort && req.query._order) {
        const sortField = req.query._sort;
        const sortOrder = req.query._order;
        const sortCriteria = {};
        sortCriteria[sortField] = sortOrder;
        query = query.sort(sortCriteria);
    }
    //@ts-ignore
    const totalDocs = await totalOrdersQuery.count().exec();
    console.log({ totalDocs });
    if (req.query._page && req.query._limit) {
        const pageSize = parseInt(req.query._limit);
        const page = parseInt(req.query._page);
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    try {
        const docs = await query.exec();
        res.set("X-Total-Count", totalDocs.toString());
        res.status(200).json(docs);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
