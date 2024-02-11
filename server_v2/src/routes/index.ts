import * as express from "express";
import { Router } from "express";
import auth from "./auth/auth.routes";
import banner from "./banner/banner.routes";
import brand from "./brands/brand.routes";
import category from "./category/category.routes";
import order from "./order/order.routes";
import Product from "./products/product.routes";
import user from "./user/user.routes";
import cart from "./cart/cart.routes";
import stripe from "./payments/stripe.routes";
import swagger from "./doc/swagger.routes";

const router: Router = express.Router();

export default {
  auth,
  banner,
  brand,
  cart,
  category,
  order,
  Product,
  user,
  stripe,
  swagger,
  router,
};
