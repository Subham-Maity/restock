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

/**
 * @swagger
 * /api/v1/createCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [🔥 Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             value: "New Category"
 *             description: "A description for the new category"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Category created successfully"
 *               savedCategory:
 *                 value: "New Category"
 *                 description: "A description for the new category"
 *       400:
 *         description: Bad request, validation errors
 *         content:
 *           application/json:
 *             example:
 *               errors: ["Validation error 1", "Validation error 2"]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */
/**
 * @swagger
 * /api/v1/fetchCategory:
 *   get:
 *     summary: Retrieve a list of all categories
 *     tags: [🔥 Categories]
 *     responses:
 *       200:
 *         description: A list of all categories
 *         content:
 *           application/json:
 *             example:
 *               - value: "Category 1"
 *                 description: "Description for Category 1"
 *               - value: "Category 2"
 *                 description: "Description for Category 2"
 *               # ... (remaining categories)
 *       404:
 *         description: No categories found
 *         content:
 *           application/json:
 *             example:
 *               message: "No categories found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */

export default category;
