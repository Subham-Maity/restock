"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartUpdateValidationRules = exports.cartIdValidationRules = exports.cartUserValidationRules = exports.cartValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.cartValidationRules = [
    (0, express_validator_1.check)("product").notEmpty().withMessage("Product is required"),
];
exports.cartUserValidationRules = [
    (0, express_validator_1.check)("user").notEmpty().withMessage("User is required"),
];
exports.cartIdValidationRules = [
    (0, express_validator_1.check)("id").notEmpty().withMessage("Cart ID is required"),
];
exports.cartUpdateValidationRules = [
    (0, express_validator_1.check)("id").notEmpty().withMessage("Cart ID is required"),
];
