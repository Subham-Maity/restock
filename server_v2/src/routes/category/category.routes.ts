import * as express from "express";
import { Router } from "express";
import {
  createCategory,
  fetchCategory,
} from "../../controller/category/category.controller";
import { categoryValidationRules } from "../../validation/express-validation/category/category.validation";

const category: Router = express.Router();

category
  .post("/", categoryValidationRules, createCategory)
  .get("/", fetchCategory);

export default category;
