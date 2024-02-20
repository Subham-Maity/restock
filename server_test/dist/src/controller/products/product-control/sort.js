"use strict";
//🔥 Sorting the products
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortProducts = void 0;
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
exports.sortProducts = sortProducts;
