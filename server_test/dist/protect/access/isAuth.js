"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const passport_1 = __importDefault(require("passport"));
//use for protected routes
exports.isAuth = passport_1.default.authenticate("jwt", { session: false });
