"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const banner_routes_1 = __importDefault(require("./banner/banner.routes"));
const brand_routes_1 = __importDefault(require("./brands/brand.routes"));
const category_routes_1 = __importDefault(require("./category/category.routes"));
const order_routes_1 = __importDefault(require("./order/order.routes"));
const product_routes_1 = __importDefault(require("./products/product.routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const cart_routes_1 = __importDefault(require("./cart/cart.routes"));
const stripe_routes_1 = __importDefault(require("./payments/stripe.routes"));
const swagger_routes_1 = __importDefault(require("./doc/swagger.routes"));
const stripe_webhook_routes_1 = __importDefault(require("./webhooks/stripe.webhook.routes"));
const router = express.Router();
exports.default = {
    auth: auth_routes_1.default,
    banner: banner_routes_1.default,
    brand: brand_routes_1.default,
    cart: cart_routes_1.default,
    category: category_routes_1.default,
    order: order_routes_1.default,
    Product: product_routes_1.default,
    user: user_routes_1.default,
    stripe: stripe_routes_1.default,
    stripeWebhook: stripe_webhook_routes_1.default,
    swagger: swagger_routes_1.default,
    router,
};
