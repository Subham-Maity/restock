"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsyncError = (asyncFun) => (req, res, next) => {
    Promise.resolve(asyncFun(req, res, next)).catch(next);
};
exports.default = catchAsyncError;
