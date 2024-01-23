"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandValidationRules = void 0;
const express_validator_1 = require("express-validator");
// Input validation rules
exports.brandValidationRules = [
    (0, express_validator_1.check)("label").notEmpty().withMessage("Label is required"),
    (0, express_validator_1.check)("value").notEmpty().withMessage("Value is required"),
];
