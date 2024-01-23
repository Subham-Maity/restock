"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationRules = void 0;
const express_validator_1 = require("express-validator"); // Input validation rules
// Input validation rules
exports.productValidationRules = [
    (0, express_validator_1.check)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.check)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.check)("brand").notEmpty().withMessage("Brand is required"),
    (0, express_validator_1.check)("category").notEmpty().withMessage("Category is required"),
    (0, express_validator_1.check)("thumbnail").notEmpty().withMessage("Thumbnail is required"),
    (0, express_validator_1.check)("images").isArray().withMessage("Images must be an array"),
];
