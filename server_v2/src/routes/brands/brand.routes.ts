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
/**
 * @swagger
 * /api/v1/brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [🔥 Brands]
 *     requestBody:
 *       description: Brand details to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *               label:
 *                 type: string
 *             example:
 *               value: "New Brand"
 *               label: "A description for the new Brand"
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Brand created successfully"
 *               savedBrand:
 *                 value: "New Brand"
 *                 label: "A description for the new Brand"
 *       400:
 *         description: Bad request. Validation errors in the request body.
 *         content:
 *           application/json:
 *             example:
 *               errors: [
 *                 {
 *                   value: "",
 *                   msg: "Brand value is required",
 *                   param: "value",
 *                   location: "body"
 *                 },
 *                 {
 *                   value: "",
 *                   msg: "Brand label is required",
 *                   param: "label",
 *                   location: "body"
 *                 }
 *               ]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/brands:
 *   get:
 *     summary: Retrieve a list of all brands
 *     tags: [🔥 Brands]
 *     responses:
 *       200:
 *         description: A list of all brands
 *         content:
 *           application/json:
 *             example:
 *               - value: "New Brand"
 *                 label: "A description for the new Brand"
 *               - value: "Another Brand"
 *                 label: "Another Label"
 *               # ... (remaining brands)
 *       404:
 *         description: No brands found
 *         content:
 *           application/json:
 *             example:
 *               message: "No brands found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */

export default brand;
