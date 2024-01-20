import * as express from "express";
import { Router } from "express";
import {addToCart, deleteFromCart, fetchCartByUser, updateCart} from "../../controller/cart/cart.controller";


const card: Router = express.Router();

card
  .post("/cart", addToCart)
  .get("/cart", fetchCartByUser)
  .delete("/cart/:id", deleteFromCart)
  .patch("/cart/:id", updateCart);

export default card;
