"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts_Text_Regex = void 0;
const searchProducts_Text_Regex = (query, req) => {
    if (req.query.q) {
        // Try $text search first
        const textSearchQuery = query
            .clone()
            .where({ $text: { $search: req.query.q } });
        // If no results from $text search, fall back to regex search
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
exports.searchProducts_Text_Regex = searchProducts_Text_Regex;
