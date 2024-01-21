import * as express from "express";
import { Router } from "express";
import {
  createCategory,
  fetchCategory,
} from "../../controller/category/category.controller";
import { categoryValidationRules } from "../../validation/category/category.validation";

const category: Router = express.Router();

category
  .post("/categories", categoryValidationRules, createCategory)
  .get("/categories", fetchCategory);

export default category;
