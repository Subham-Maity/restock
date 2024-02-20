"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidationRules = void 0;
const express_validator_1 = require("express-validator");
// Input validation rules
exports.categoryValidationRules = [
    (0, express_validator_1.check)("label").notEmpty().withMessage("Label is required"),
    (0, express_validator_1.check)("value").notEmpty().withMessage("Value is required"),
];
