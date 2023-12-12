import * as express from "express";
import {Router} from "express";
import {addToCart, deleteFromCart, fetchCartByUser, updateCart} from "../../controller/cart/cart.controller.js";



const router: Router = express.Router();


router
    .post("/",addToCart)
    .get("/", fetchCartByUser)
    .delete("/:id", deleteFromCart)
    .patch("/:id", updateCart);


export default router;