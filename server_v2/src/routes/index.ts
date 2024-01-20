import * as express from "express";
import { Router } from "express";
import auth from "./auth/auth.routes";
import banner from "./banner/banner.routes";
import brand from "./brands/brand.routes";
import card from "./cart/cart.routes";
import category from "./category/category.routes";
import order from "./order/order.routes";
import Product from "./products/product.routes";
import user from "./user/user.routes";

const router: Router = express.Router();

export default {
  auth,
  banner,
  brand,
  card,
  category,
  order,
  Product,
  user,
  router,
};
