import * as express from "express";

import {createProduct, fetchProductById, updateProduct} from "../../controller/products/product.controller.js"
import {fetchProduct} from "../../controller/products/product.controller.js"
import {Router} from "express";


const router: Router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - brand
 *         - category
 *         - thumbnail
 *         - images
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the product. This field is required.
 *         description:
 *           type: string
 *           description: A detailed description of the product. This field is required.
 *         price:
 *           type: number
 *           description: The price of the product before any discounts. This field is required.
 *         discountPercentage:
 *           type: number
 *           description: The percentage discount on the product.
 *         rating:
 *           type: number
 *           description: The average rating of the product.
 *         stock:
 *           type: number
 *           description: The number of items in stock.
 *         brand:
 *           type: string
 *           description: The brand of the product. This field is required.
 *         category:
 *           type: string
 *           description: The category of the product. This field is required.
 *         thumbnail:
 *           type: string
 *           description: The URL of the thumbnail image. This field is required.
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of URLs of the product images. This field is required.
 *         colors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the color.
 *               hex:
 *                 type: string
 *                 description: The hex code of the color.
 *           description: An array of available colors for the product.
 *         sizes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The size of the product.
 *           description: An array of available sizes for the product.
 *         highlights:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of highlights of the product.
 *         discountPrice:
 *           type: number
 *           description: The price of the product after discount.
 *         deleted:
 *           type: boolean
 *           default: false
 *           description: A flag indicating whether the product is deleted.
 *       example:
 *         title: "Nike Air Max 270"
 *         description: "Lorem ipsum dolor sit amet..."
 *         price: 150
 *         discountPercentage: 10
 *         rating: 4.5
 *         stock: 10
 *         brand: "Nike"
 *         category: "Shoes"
 *         thumbnail: "https://example.com/image.jpg"
 *         images:
 *           - "https://example.com/image1.jpg"
 *           - "https://example.com/image2.jpg"
 *         colors:
 *           - name: "Red"
 *             hex: "#ff0000"
 *           - name: "Blue"
 *             hex: "#0000ff"
 *         sizes:
 *           - name: "Small"
 *           - name: "Medium"
 *           - name: "Large"
 *         highlights:
 *           - "Highlight 1"
 *           - "Highlight 2"
 *         discountPrice: 135
 *         deleted: false
 */

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
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
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
 *
 *   get:
 *     summary: Fetch all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category of the product
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: The brand of the product
 *       - in: query
 *         name: _sort
 *         schema:
 *           type: string
 *         description: The field to sort by
 *       - in: query
 *         name: _order
 *         schema:
 *           type: string
 *         description: The order of sorting (asc or desc)
 *       - in: query
 *         name: _page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: _limit
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             example:
 *               message: "No products found"
 */
/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Fetch all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category of the product
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: The brand of the product
 *       - in: query
 *         name: _sort
 *         schema:
 *           type: string
 *         description: The field to sort by
 *       - in: query
 *         name: _order
 *         schema:
 *           type: string
 *         description: The order of sorting (asc or desc)
 *       - in: query
 *         name: _page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: _limit
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             example:
 *               message: "No products found"
 */
/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Product not found"
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid data provided
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid data provided"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Product not found"
 */
router
    .post('/', createProduct)
    .get('/', fetchProduct)
    .get('/:id', fetchProductById)
    .patch('/:id',updateProduct)


export default router;