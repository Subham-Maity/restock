"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsSuccessStatus = exports.credentials = exports.exposedHeaders = exports.development_domain_whitelist = exports.production_domain_whitelist = void 0;
const default_1 = require("../../config/default");
exports.production_domain_whitelist = [
    default_1.CORS_ORIGIN_Domain_1,
    default_1.CORS_ORIGIN_Domain_2,
];
exports.development_domain_whitelist = true;
exports.exposedHeaders = ["X-Total-Count"];
exports.credentials = true;
exports.optionsSuccessStatus = 200;
