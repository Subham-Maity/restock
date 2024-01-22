import * as express from "express";
import { Router } from "express";
import {
  addToCart,
  deleteFromCart,
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
  .post("/", cartValidationRules, addToCart)
  .get("/", cartUserValidationRules, getCartByUser)
  .delete("/:id", cartIdValidationRules, deleteFromCart)
  .patch("/:id", cartUpdateValidationRules, updateCartById);

export default cart;
