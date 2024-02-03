"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueKey = exports.setInRedis = exports.getFromRedis = void 0;
const redis_1 = __importDefault(require("./redis"));
// Function to get a value from Redis based on a key
const getFromRedis = async (key) => {
    const result = await redis_1.default.get(key);
    return result ? JSON.parse(result) : null;
};
exports.getFromRedis = getFromRedis;
// Function to set a key-value pair in Redis with an expiration time
const setInRedis = async (key, value, expireTimeInSeconds) => {
    await redis_1.default.set(key, JSON.stringify(value), "EX", expireTimeInSeconds);
};
exports.setInRedis = setInRedis;
// Function to generate a unique key for each request
const generateUniqueKey = (condition, query, baseKey) => {
    return `${baseKey}:${JSON.stringify(condition)}:${JSON.stringify(query)}`;
};
exports.generateUniqueKey = generateUniqueKey;
