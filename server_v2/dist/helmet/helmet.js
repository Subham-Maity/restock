"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSecurity = void 0;
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const setupSecurity = (app) => {
    // Use Helmet to set security-related HTTP headers
    app.use((0, helmet_1.default)());
    // Set Cross-Origin Resource Policy
    app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
    // Use HTTP Strict Transport Security (HSTS) to force clients to use HTTPS
    app.use(helmet_1.default.hsts());
    // Prevents clickjacking attacks by setting the X-Frame-Options header
    app.use(helmet_1.default.frameguard({ action: "deny" }));
    // Protect against Cross-Site Scripting (XSS) attacks by setting the X-XSS-Protection header
    app.use(helmet_1.default.xssFilter());
    // Rate limiting to limit repeated requests to API endpoints and/or endpoints such as login
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 500, // limit each IP to 100 requests per windowMs
        message: "Too many requests from this IP, please try again in 15 minutes",
    });
    //  apply to all requests
    app.use(limiter);
};
exports.setupSecurity = setupSecurity;
