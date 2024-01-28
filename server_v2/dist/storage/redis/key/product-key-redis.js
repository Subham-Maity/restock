"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBaseKey = void 0;
const generateBaseKey = (query) => {
    let baseKey = "Product";
    if (Object.keys(query).length === 0) {
        baseKey += "-Fetch";
    }
    else if (query.q) {
        baseKey += "-Search";
    }
    else if (query.category || query.brand) {
        baseKey += "-Filter";
    }
    else if (query._sort) {
        baseKey += "-Sort";
    }
    else if (query._page || query._limit) {
        baseKey += "-Pagination";
    }
    return baseKey;
};
exports.generateBaseKey = generateBaseKey;
