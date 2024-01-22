import * as express from "express";
import { Router } from "express";
import {
  addProductToCart,
  deleteProductFromCart,
  getCartByUser,
  updateCartById,
} from "../../controller/cart/cart.controller";
import {
  cartIdValidationRules,
  cartUpdateValidationRules,
  cartUserValidationRules,
  cartValidationRules,
} from "../../validation/carts/cart.validation";

const cart: Router = express.Router();

cart
  .post("/", cartValidationRules, addProductToCart)
  .get("/", cartUserValidationRules, getCartByUser)
  .delete("/:id", cartIdValidationRules, deleteProductFromCart)
  .patch("/:id", cartUpdateValidationRules, updateCartById);

export default cart;
