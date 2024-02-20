"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBaseQuery = void 0;
// Function to build the base query
const order_model_1 = __importDefault(require("../../../model/order/order.model"));
const buildBaseQuery = (req) => {
    let query = order_model_1.default.find({ deleted: { $ne: true } });
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
    }
    return query;
};
exports.buildBaseQuery = buildBaseQuery;
