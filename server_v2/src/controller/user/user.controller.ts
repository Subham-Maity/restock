import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../middleware/error/catchAsyncError";
import { isValidObjectId } from "mongoose";
import ErrorHandler from "../../utils/errorHandler/errorHandler";
import { findUserById, updateUserById } from "./user.model.controller";

/*☑️ Fetch User By Id ☑️*/
export const fetchUserById = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      // Check if the provided ID is valid
      if (!id || !isValidObjectId(id)) {
        return next(new ErrorHandler("Invalid user ID", 400));
      }

      const user = await findUserById(id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      res
        .status(200)
        .json({
          id: user.id,
          addresses: user.addresses,
          email: user.email,
          role: user.role,
        });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        next(new ErrorHandler("Internal server error", 500));
      }
    }
  },
);

/*☑️ UPDATE USER ☑️ */
export const updateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      // Check if the provided ID is valid
      if (!id || !isValidObjectId(id)) {
        return next(new ErrorHandler("Invalid user ID", 400));
      }

      const updatedUser = await updateUserById(id, req.body);

      if (!updatedUser) {
        return next(new ErrorHandler("User not found", 404));
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        next(new ErrorHandler("Internal server error", 500));
      }
    }
  },
);
