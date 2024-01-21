import * as express from "express";
import { Router } from "express";
import {
  createBrand,
  fetchBrand,
} from "../../controller/brand/brand.controller";
import { brandValidationRules } from "../../validation/brand/brand.validation";

const brand: Router = express.Router();
brand
  .post("/brands", brandValidationRules, createBrand)
  .get("/brands", fetchBrand);

export default brand;
