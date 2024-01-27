import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../middleware/error/catchAsyncError";
import ErrorHandler from "../../utils/errorHandler/errorHandler";
import Product from "../../model/products/product.model";
import AppError from "../../middleware/error/appError";
import { validationResult } from "express-validator";
import {
  findProductById,
  saveProduct,
  updateProductById,
} from "./product.model.controller";
import { QueryParams } from "../../types/products/QueryParam";
import { IProduct } from "../../types/products/product";
import redisClient from "../../storage/redis/redis";

/*☑️ CREATE PRODUCT ☑️ */
export const createProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //this save product function is in the product.model.ts
      //it will check if the product is already in the database or not
      const savedProduct = await saveProduct(req.body);
      res.status(201).json({
        message: "Product created successfully",
        savedProduct,
      });
    } catch (error) {
      next(error);
    }
  },
);

/*☑️ PRODUCT OPERATIONS ☑️ */
//Testing URL: http://localhost:5050/products?category=fragrances&brand=Samsung&_sort=price&_order=asc&_page=1&_limit=2

//custom error class for product not found*/
class ProductNotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

/*☑️ Filtering, Sorting, Pagination on Product ☑️*/
/**
 Filtering the products based on the query parameters
 Sort Example = {_sort: 'price', _order: 'asc'} or {_sort: 'price', _order: 'desc'}
 Filter Example  = {"category": ["smartphone", "laptop"]} or {"brand": ["apple", "samsung"]}
 Pagination Example = {_page: 1, _limit: 20} or {_page: 2, _limit: 20}
 */

//Use for admin if admin is true then show all products including deleted products
const buildCondition = (req: Request<{}, {}, {}, QueryParams>) => {
  let condition: any = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }
  return condition;
};

//🔥 Searching the products
//Faster than regex search but only works with text indexes
const searchProducts_Text = (
  query: any,
  req: Request<{}, {}, {}, QueryParams>,
) => {
  if (req.query.q) {
    query = query.where({ $text: { $search: req.query.q } });
  }
  return query;
};

//Slower than text search but works without text indexes and can search for partial words
const searchProducts_Regex = (
  query: any,
  req: Request<{}, {}, {}, QueryParams>,
) => {
  if (req.query.q) {
    const regex = new RegExp(req.query.q, "i"); // 'i' makes it case-insensitive
    query = query.where({
      $or: [
        { title: regex },
        { description: regex },
        { brand: regex },
        { category: regex },
      ],
    });
  }
  return query;
};

//Try $text search first, if no results then fall back to regex search
//Slower than text search but better than regex search
// and works without text indexes and can search for partial words
const searchProducts_Text_Regex = (
  query: any,
  req: Request<{}, {}, {}, QueryParams>,
) => {
  if (req.query.q) {
    // Try $text search first
    const textSearchQuery = query
      .clone()
      .where({ $text: { $search: req.query.q } });

    // If no results from $text search, fall back to regex search
    const regex = new RegExp(req.query.q, "i"); // 'i' makes it case insensitive
    query = query.where({
      $or: [
        { title: regex },
        { description: regex },
        { brand: regex },
        { category: regex },
      ],
    });
  }
  return query;
};

//🔥 Filtering the products
const filterProducts = (query: any, req: Request<{}, {}, {}, QueryParams>) => {
  if (req.query.category) {
    //example: query.where({category: ["smartphone", "laptop"]})
    //if we get the category query parameter, we will filter the products based on the category
    query = query.where({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.where({ brand: req.query.brand });
  }
  return query;
};

//🔥 Sorting the products
const sortProducts = (query: any, req: Request<{}, {}, {}, QueryParams>) => {
  if (req.query._sort && req.query._order) {
    const sortKey = req.query._sort as string;
    const sortOrder = req.query._order as string;
    const sortCriteria: { [key: string]: "asc" | "desc" } = {};
    sortCriteria[sortKey] = sortOrder as "asc" | "desc";
    query = query.sort(sortCriteria);
  }
  return query;
};

//🔥 Pagination of products
const paginateProducts = (
  query: any,
  req: Request<{}, {}, {}, QueryParams>,
) => {
  if (req.query._page && req.query._limit) {
    const pageSize = parseInt(req.query._limit as string);
    const page = parseInt(req.query._page as string);
    query = query.skip((page - 1) * pageSize).limit(pageSize);
  }
  return query;
};

//🔥 Fetching all products with filtering, sorting, pagination
export const fetchProduct = catchAsyncError(
  async (
    req: Request<{}, {}, {}, QueryParams>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      //filtering the products based on the query parameters
      let condition = buildCondition(req);

      //Redis
      // Generate a unique key for this query
      const queryKey = JSON.stringify(condition) + JSON.stringify(req.query);

      // Try to get the result from Redis
      const cachedResult = await redisClient.get(queryKey);

      if (cachedResult) {
        // If the result is in Redis, parse it and return it
        return res.status(200).json(JSON.parse(cachedResult));
      }

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
      const docs = await query.exec();

      //executing the query and getting the products - It will be used for pagination (X-Total-Count)
      const totalDocs = await totalProductsQuery.countDocuments().exec();

      //setting the header for pagination (X-Total-Count)
      res.set("X-Total-Count", totalDocs.toString());

      //if no products found then return error
      if (docs.length === 0) {
        return next(new AppError("No products found", 404));
      }
      // Store the result in Redis for future queries
      redisClient.set(queryKey, JSON.stringify(docs));
      //returning the products
      res.status(200).json(docs);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        next(error);
      }
    }
  },
);

/*☑️ FETCHING A SINGLE PRODUCT ☑️ */

//custom error class for product not found*/
class ProductNotFoundError2 extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

//Fetching a single product
export const fetchProductById = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const product = await findProductById(id);

      if (!product) {
        throw new ProductNotFoundError2("Product not found");
      }

      res.status(200).json(product);
    } catch (error) {
      if (error instanceof ProductNotFoundError2) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        next(error);
      }
    }
  },
);

/*☑️ UPDATE PRODUCT ☑️ */

// Helper function to check if ID is a valid ObjectId
function isValidObjectId(id: string): boolean {
  // Use your preferred method to validate ObjectId (e.g., using mongoose.Types.ObjectId.isValid)
  // For example:
  // return mongoose.Types.ObjectId.isValid(id);
  return /^[0-9a-fA-F]{24}$/.test(id); // Simplified check (24-character hex string)
}

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
    try {
      const { id } = req.params;

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
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        next(new ErrorHandler("Internal server error", 500));
      }
    }
  },
);
