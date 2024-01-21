import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../middleware/error/catchAsyncError";
import ErrorHandler from "../../utils/errorHandler/errorHandler";
import { validationResult } from "express-validator";
import { fetchAllCategories, saveCategory } from "./category.model.controller";

/*☑️ CREATE CATEGORY ☑️*/
export const createCategory = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const savedCategory = await saveCategory(req.body);
      res.status(201).json({
        message: "Category created successfully",
        savedCategory,
      });
    } catch (error) {
      next(error);
    }
  },
);

//*☑️ GET ALL CATEGORIES ☑️*/
export const fetchCategory = catchAsyncError(
  async (_: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await fetchAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        next(error);
      }
    }
  },
);
