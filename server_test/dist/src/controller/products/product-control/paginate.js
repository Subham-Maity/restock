"use strict";
//🔥 Pagination of products
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateProducts = void 0;
const paginateProducts = (query, req) => {
    if (req.query._page && req.query._limit) {
        const pageSize = Number(req.query._limit);
        const page = Number(req.query._page);
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    return query;
};
exports.paginateProducts = paginateProducts;
