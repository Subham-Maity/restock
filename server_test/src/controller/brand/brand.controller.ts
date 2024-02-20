import { NextFunction, Request, Response } from "express";

import catchAsyncError from "../../../error/catchAsyncError";
import ErrorHandler from "../../../error/errorHandler";
import {
  fetchAllBrands,
  saveBrand,
} from "./model-control/brand.model.controller"; /*☑️ CREATE BRAND ☑️ */

/*☑️ CREATE BRAND ☑️ */
export const createBrand = catchAsyncError(
  async (req: Request, res: Response, _: NextFunction) => {
    const savedBrand = await saveBrand(req.body);
    if (!savedBrand) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to create brand",
      });
    }
    res.status(201).json({
      message: "Brand created successfully",
      savedBrand,
    });
  },
);

/*☑️ GET ALL BRANDS ☑️ */
export const fetchBrand = catchAsyncError(
  async (_, res: Response, next: NextFunction) => {
    const brands = await fetchAllBrands();

    if (!brands) {
      return next(new ErrorHandler("No brands found", 404));
    }
    res.status(200).json(brands);
  },
);
