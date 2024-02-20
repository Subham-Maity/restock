"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProducts = void 0;
//🔥 Filtering the products
const filterProducts = (query, req) => {
    if (req.query.category) {
        //example: query.where({category: ["smartphone", "laptop"]})
        //if we get the category query parameter, we will filter the products based on the category
        query = query.where({ category: req.query.category });
    }
    if (req.query.brand) {
        query = query.where({ brand: req.query.brand });
    }
    return query;
};
exports.filterProducts = filterProducts;
