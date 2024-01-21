import * as express from "express";
import { Router } from "express";
import {
  createProduct,
  fetchProduct,
  fetchProductById,
  updateProduct,
} from "../../controller/products/product.controller";
import { productValidationRules } from "../../validation/products/product.validation";

const Product: Router = express.Router();

Product.post("/", productValidationRules, createProduct)
  .get("/", fetchProduct)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct);

export default Product;
