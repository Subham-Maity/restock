"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateValidationRules = void 0;
const express_validator_1 = require("express-validator");
// Input validation rules
exports.userUpdateValidationRules = [
    (0, express_validator_1.check)("name").optional().notEmpty().withMessage("Name cannot be empty"),
    (0, express_validator_1.check)("email")
        .optional()
        .isEmail()
        .withMessage("Must be a valid email address"),
];
