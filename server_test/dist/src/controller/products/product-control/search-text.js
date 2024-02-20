"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts_Text = void 0;
//🔥 Searching the products
//Faster than regex search but only works with text indexes
const searchProducts_Text = (query, req) => {
    if (req.query.q) {
        query = query.where({ $text: { $search: req.query.q } });
    }
    return query;
};
exports.searchProducts_Text = searchProducts_Text;
