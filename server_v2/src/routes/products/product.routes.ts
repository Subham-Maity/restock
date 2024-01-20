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
/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             colors: []
 *             sizes: []
 *             deleted: false
 *             title: "New"
 *             description: "Comfortable stretch cloth, lightweight body; ,rubber sole, anti-skid wear;"
 *             price: 20
 *             discountPercentage: 8.71
 *             rating: 4.33
 *             stock: 137
 *             brand: "Sneakers"
 *             category: "mens-shoes"
 *             thumbnail: "https://i.dummyjson.com/data/products/59/thumbnail.jpg"
 *             images:
 *               - "https://i.dummyjson.com/data/products/59/1.jpg"
 *               - "https://i.dummyjson.com/data/products/59/2.jpg"
 *               - "https://i.dummyjson.com/data/products/59/3.jpg"
 *               - "https://i.dummyjson.com/data/products/59/4.jpg"
 *               - "https://i.dummyjson.com/data/products/59/thumbnail.jpg"
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             example:
 *               message: "Product created successfully"
 *               savedProduct:
 *                 colors: []
 *                 sizes: []
 *                 deleted: false
 *                 title: "New"
 *                 description: "Comfortable stretch cloth, lightweight body; ,rubber sole, anti-skid wear;"
 *                 price: 20
 *                 discountPercentage: 8.71
 *                 rating: 4.33
 *                 stock: 137
 *                 brand: "Sneakers"
 *                 category: "mens-shoes"
 *                 thumbnail: "https://i.dummyjson.com/data/products/59/thumbnail.jpg"
 *                 images:
 *                   - "https://i.dummyjson.com/data/products/59/1.jpg"
 *                   - "https://i.dummyjson.com/data/products/59/2.jpg"
 *                   - "https://i.dummyjson.com/data/products/59/3.jpg"
 *                   - "https://i.dummyjson.com/data/products/59/4.jpg"
 *                   - "https://i.dummyjson.com/data/products/59/thumbnail.jpg"
 *       400:
 *         description: Please fill all required fields
 *         content:
 *           application/json:
 *             example:
 *               message: "Please fill all required fields"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Retrieve a list of products with optional filtering, sorting, pagination, and search
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: admin
 *         schema:
 *           type: string
 *         description: Flag to include deleted products (optional)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category (optional)
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter products by brand (optional)
 *       - in: query
 *         name: _sort
 *         schema:
 *           type: string
 *         description: Sort products by a specified attribute (optional)
 *       - in: query
 *         name: _order
 *         schema:
 *           type: string
 *         description: Specify the sorting order (asc or desc) (optional)
 *       - in: query
 *         name: _page
 *         schema:
 *           type: string
 *         description: Current page for pagination (optional)
 *       - in: query
 *         name: _limit
 *         schema:
 *           type: string
 *         description: Number of items per page for pagination (optional)
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query to filter products (optional)
 *     responses:
 *       200:
 *         description: A list of products with optional filtering, sorting, and pagination
 *         content:
 *           application/json:
 *             examples:
 *               multipleExamples:
 *                 summary: Multiple Examples of Product Listing
 *                 value:
 *                   - colors: []
 *                     sizes: []
 *                     deleted: false
 *                     id: "657483b37ebcb47acc9407b2"
 *                     title: "Samsung Universe 9"
 *                     description: "Samsung's new variant which goes beyond Galaxy to the Universe"
 *                     price: 1249
 *                     discountPercentage: 15.46
 *                     rating: 4.09
 *                     stock: 36
 *                     brand: "Samsung"
 *                     category: "smartphones"
 *                     thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg"
 *                     images:
 *                       - "https://i.dummyjson.com/data/products/3/1.jpg"
 *                   - ... (remaining products)
 *               specificExample:
 *                 summary: Example with specific parameters
 *                 value:
 *                   - colors: []
 *                     sizes: []
 *                     deleted: false
 *                     id: "exampleProductId1"
 *                     title: "Fragrance Product 1"
 *                     description: "A delightful fragrance"
 *                     price: 20
 *                     discountPercentage: 5.0
 *                     rating: 4.5
 *                     stock: 50
 *                     brand: "Samsung"
 *                     category: "fragrances"
 *                     thumbnail: "https://example.com/thumbnail.jpg"
 *                     images:
 *                       - "https://example.com/image1.jpg"
 *                       - "https://example.com/image2.jpg"
 *                   - ... (remaining products)
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             example:
 *               message: "No products found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */

Product.post("/products", productValidationRules, createProduct)
  .get("/products", fetchProduct)
  .get("/products/:id", fetchProductById)
  .patch("/products/:id", updateProduct);

export default Product;
