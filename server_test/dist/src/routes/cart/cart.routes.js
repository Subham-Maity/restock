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
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const cart_controller_1 = require("../../controller/cart/cart.controller");
const cart_validation_1 = require("../../validation/express-validation/carts/cart.validation");
const cart = express.Router();
cart
    .post("/", cart_validation_1.cartValidationRules, cart_controller_1.addProductToCart)
    .get("/", cart_validation_1.cartUserValidationRules, cart_controller_1.getCartByUser)
    .delete("/:id", cart_validation_1.cartIdValidationRules, cart_controller_1.deleteProductFromCart)
    .patch("/:id", cart_validation_1.cartUpdateValidationRules, cart_controller_1.updateCartById);
exports.default = cart;
