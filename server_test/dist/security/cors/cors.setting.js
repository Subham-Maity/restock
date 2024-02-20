"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.development_domain_whitelist = exports.production_domain_whitelist = exports.CORS_ORIGIN_Domain_2 = exports.optionsSuccessStatus = exports.credentials = exports.exposedHeaders = void 0;
//common settings for cors
exports.exposedHeaders = ["X-Total-Count"];
exports.credentials = true;
exports.optionsSuccessStatus = 200;
//Production
const CORS_ORIGIN_Domain_1 = process.env.CORS_URL_1 || "http://localhost:3000";
exports.CORS_ORIGIN_Domain_2 = process.env.CORS_URL_2 || "http://localhost:3001";
exports.production_domain_whitelist = [
    CORS_ORIGIN_Domain_1,
    exports.CORS_ORIGIN_Domain_2,
];
//Development
exports.development_domain_whitelist = true;
