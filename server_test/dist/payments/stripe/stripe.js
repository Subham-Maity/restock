"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe_setting_1 = require("./stripe-setting");
exports.stripe = new stripe_1.default(stripe_setting_1.stripe_api_key, {
    apiVersion: stripe_setting_1.stripe_api_version,
    appInfo: {
        name: "restock",
        url: "https://restock.app",
    },
});
