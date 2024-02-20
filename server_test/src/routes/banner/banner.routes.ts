import * as express from "express";
import { Router } from "express";
import {
  fetchBanner,
  updateBanner,
} from "../../controller/banner/banner.controller";
// import {createProduct, fetchProductById, updateProduct} from "../../controller/products/product.controller.js"
// import {fetchProduct} from "../../controller/products/product.controller.js"

const banner: Router = express.Router();

banner.post("/", updateBanner).get("/", fetchBanner);

export default banner;
