"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const redis_config_1 = require("./redis-config");
const redisClient = new ioredis_1.default({
    host: redis_config_1.redis_host,
    port: redis_config_1.redis_port,
});
exports.default = redisClient;
