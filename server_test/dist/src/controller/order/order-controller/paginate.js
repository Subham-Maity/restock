"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateQuery = void 0;
// Function to paginate the query
const paginateQuery = (query, req) => {
    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    return query;
};
exports.paginateQuery = paginateQuery;
