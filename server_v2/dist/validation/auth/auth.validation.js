"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegistrationRules = void 0;
const express_validator_1 = require("express-validator");
exports.userRegistrationRules = [
    (0, express_validator_1.check)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("Password is required"),
];
