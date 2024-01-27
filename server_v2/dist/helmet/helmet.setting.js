"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helmet_rate_limit_max = exports.helmet_rate_limit_message = exports.helmet_rate_limit_windowMs = void 0;
exports.helmet_rate_limit_windowMs = 15 * 60 * 1000; // 15 minutes
exports.helmet_rate_limit_message = `Too many requests from this IP, please try again in ${exports.helmet_rate_limit_windowMs / 1000 / 60} minutes`;
exports.helmet_rate_limit_max = 1000; // limit each IP to 100 requests per windowMs
