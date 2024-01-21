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

Product.post("/products", productValidationRules, createProduct)
  .get("/products", fetchProduct)
  .get("/products/:id", fetchProductById)
  .patch("/products/:id", updateProduct);

export default Product;
