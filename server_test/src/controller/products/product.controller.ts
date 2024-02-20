import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../../error/catchAsyncError";
import ErrorHandler from "../../../error/errorHandler";
import Product from "../../model/products/product.model";

import {
  findProductById,
  saveProduct,
  updateProductById,
} from "./model-control/product.model.controller";
import { QueryParams } from "../../types/products/QueryParam";
import { IProduct } from "../../types/products/product";
import { isValidObjectId } from "mongoose";
import { paginateProducts } from "./product-control/paginate";
import { searchProducts_Text_Regex } from "./product-control/search-text-regex";
import { sortProducts } from "./product-control/sort";
import { filterProducts } from "./product-control/filter";
import { buildCondition } from "./product-control/admin-only";

/*☑️ CREATE PRODUCT ☑️ */
export const createProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const savedProduct = await saveProduct(req.body);
    if (!savedProduct) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to create product",
      });
    }
    res.status(201).json({
      message: "Product created successfully",
      savedProduct,
    });
  },
);

/*☑️ Filtering, Sorting, Pagination on Product ☑️*/
/**
 Filtering the products based on the query parameters
 Sort Example = {_sort: 'price', _order: 'asc'} or {_sort: 'price', _order: 'desc'}
 Filter Example  = {"category": ["smartphone", "laptop"]} or {"brand": ["apple", "samsung"]}
 Pagination Example = {_page: 1, _limit: 20} or {_page: 2, _limit: 20}
 */

//🔥 Fetching all products with filtering, sorting, pagination
export const fetchProduct = catchAsyncError(
  async (
    req: Request<{}, {}, {}, QueryParams>,
    res: Response,
    next: NextFunction,
  ) => {
    //filtering the products based on the query parameters
    let condition = buildCondition(req);
    /* TODO: will add the redis feature here
    //Redis
    // Generate a unique key for this query based on the query parameters
    // in redis we will store the data based on this key, and when we will
    // fetch the data, we will use this key
    const baseKey = generateBaseKey(req.query);

    // Generate a unique key for this query based on the query parameters
    // in redis we will store the data based on this key and when we will
    // fetch the data, we will use this key
    const queryKey = generateUniqueKey(condition, req.query, baseKey);

    let docs = await getFromRedis(queryKey);

    if (docs) {
      return res.status(200).json(docs);
    }
   */
    // Initialize the query without executing it - Purpose: Deleted false products won't show up on the frontend
    // It will be used for pagination, filtering and sorting
    let query = Product.find(condition);

    //This will use it for pagination (X-Total-Count)
    let totalProductsQuery = Product.find(condition);

    //filtering the products based on the query parameters - filtering
    query = filterProducts(query, req);

    //sorting the products based on the query parameters - sorting
    totalProductsQuery = filterProducts(totalProductsQuery, req);

    //sorting the products based on the query parameters - sorting
    query = sortProducts(query, req);

    //pagination of the products based on the query parameters - pagination
    query = paginateProducts(query, req);

    //searching the products based on the query parameters - searching
    query = searchProducts_Text_Regex(query, req);

    //executing the query and getting the products
    /* TODO: will add the redis feature here
    //Redis
    docs = await query.exec();
    */
    //if redis is used then comment the below line
    const docs = await query.exec();

    //executing the query and getting the products - It will be used for pagination (X-Total-Count)
    const totalDocs = await totalProductsQuery.countDocuments().exec();

    //setting the header for pagination (X-Total-Count)
    res.set("X-Total-Count", totalDocs.toString());

    //if no products found then return error
    if (docs.length === 0) {
      return next(new ErrorHandler("No products found", 404));
    }

    /* TODO: will add the redis feature here
    // Store the result in Redis for future queries
    await setInRedis(queryKey, docs, 3600); // 1 hour
    
    */

    //returning the products
    res.status(200).json(docs);
  },
);

/*☑️ FETCHING A SINGLE PRODUCT ☑️ */

//Fetching a single product
export const fetchProductById = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    // Check if the provided ID is valid
    if (!id || !isValidObjectId(id)) {
      return next(new ErrorHandler("Invalid product ID", 400));
    }
    const product = await findProductById(id);

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    res.status(200).json(product);
  },
);

/*☑️ UPDATE PRODUCT ☑️ */

// Function to calculate the discount price
export const calculateDiscountPrice = async (
  product: IProduct,
): Promise<number> => {
  return Math.round(
    product.price * (1 - (product.discountPercentage || 0) / 100),
  );
};

// Update product
export const updateProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    // Check if the provided ID is valid
    if (!id || !isValidObjectId(id)) {
      return next(new ErrorHandler("Invalid product ID", 400));
    }
    const updatedProduct = await updateProductById(id, req.body);

    if (!updatedProduct) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Calculate discountPrice if necessary
    if ("price" in req.body || "discountPercentage" in req.body) {
      updatedProduct.discountPrice =
        await calculateDiscountPrice(updatedProduct);
      await updatedProduct.save();
    }

    res.status(200).json(updatedProduct);
  },
);
