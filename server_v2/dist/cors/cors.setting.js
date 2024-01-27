"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsSuccessStatus = exports.credentials = exports.exposedHeaders = exports.cors_origin = void 0;
const default_1 = __importDefault(require("../config/default"));
exports.cors_origin = default_1.default.corsOrigin;
exports.exposedHeaders = ["X-Total-Count"];
exports.credentials = true;
exports.optionsSuccessStatus = 200;
