import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../../error/catchAsyncError";
import ErrorHandler from "../../../error/errorHandler";
import {
  fetchAllCategories,
  saveCategory,
} from "./model-control/category.model.controller";

/*☑️ CREATE CATEGORY ☑️*/
export const createCategory = catchAsyncError(
  async (req: Request, res: Response, _: NextFunction) => {
    const savedCategory = await saveCategory(req.body);
    if (!savedCategory) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to create category",
      });
    }
    res.status(201).json({
      message: "Category created successfully",
      savedCategory,
    });
  },
);

//*☑️ GET ALL CATEGORIES ☑️*/
export const fetchCategory = catchAsyncError(
  async (_: Request, res: Response, next: NextFunction) => {
    const categories = await fetchAllCategories();
    if (!categories) {
      return next(new ErrorHandler("No categories found", 404));
    }
    res.status(200).json(categories);
  },
);
