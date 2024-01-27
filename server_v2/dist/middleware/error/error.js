"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, _req, res) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
    if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = Object.values(err.errors).map((items) => items.message).join(',');
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
