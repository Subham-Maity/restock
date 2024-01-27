"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis_host = exports.redis_port = exports.isProduction = void 0;
exports.isProduction = process.env.NODE_ENV === "production";
exports.redis_port = 6379;
exports.redis_host = exports.isProduction ? "redis" : "localhost";
