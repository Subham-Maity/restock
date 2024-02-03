import * as express from "express";
import { Router } from "express";
import {
  createProduct,
  fetchProduct,
  fetchProductById,
  updateProduct,
} from "../../controller/products/product.controller";
import { productValidationRules } from "../../validation/zod-validation/products/product.validation";
import { validate } from "../../../middleware/zod/zod";

const Product: Router = express.Router();

Product.post("/", validate(productValidationRules), createProduct)
  .get("/", fetchProduct)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct);

export default Product;
