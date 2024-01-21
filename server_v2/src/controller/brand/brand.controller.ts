import { NextFunction, Request, Response } from "express";

import catchAsyncError from "../../middleware/error/catchAsyncError";
import ErrorHandler from "../../utils/errorHandler/errorHandler";
import { validationResult } from "express-validator";
import { fetchAllBrands, saveBrand } from "./brand.model.controller"; /*☑️ CREATE BRAND ☑️ */

/*☑️ CREATE BRAND ☑️ */
export const createBrand = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const savedBrand = await saveBrand(req.body);
      res.status(201).json({
        message: "Brand created successfully",
        savedBrand,
      });
    } catch (error) {
      next(error);
    }
  },
);

/*☑️ GET ALL BRANDS ☑️ */
export const fetchBrand = catchAsyncError(
  async (_, res: Response, next: NextFunction) => {
    try {
      const brands = await fetchAllBrands();
      res.status(200).json(brands);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        next(error);
      }
    }
  },
);
