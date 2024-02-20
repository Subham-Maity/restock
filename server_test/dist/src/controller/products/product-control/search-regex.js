"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts_Regex = void 0;
//Slower than text search but works without text indexes and can search for partial words
const searchProducts_Regex = (query, req) => {
    if (req.query.q) {
        const regex = new RegExp(req.query.q, "i"); // 'i' makes it case-insensitive
        query = query.where({
            $or: [
                { title: regex },
                { description: regex },
                { brand: regex },
                { category: regex },
            ],
        });
    }
    return query;
};
exports.searchProducts_Regex = searchProducts_Regex;
