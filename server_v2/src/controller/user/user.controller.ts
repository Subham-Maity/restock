import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../error/catchAsyncError";
import { isValidObjectId } from "mongoose";
import ErrorHandler from "../../error/errorHandler";
import {
  findUserById,
  updateUserById,
} from "./model-control/user.model.controller";

/*☑️ Fetch User By Id ☑️*/
export const fetchUserById = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as { id: string };

    // Check if the provided ID is valid
    if (!id || !isValidObjectId(id)) {
      return next(new ErrorHandler("Invalid user ID", 400));
    }

    const user = await findUserById(id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      id: user.id,
      addresses: user.addresses,
      email: user.email,
      role: user.role,
    });
  },
);

/*☑️ UPDATE USER ☑️ */
export const updateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    // Check if the provided ID is valid
    if (!id || !isValidObjectId(id)) {
      return next(new ErrorHandler("Invalid user ID", 400));
    }

    const updatedUser = await updateUserById(id, req.body);

    if (!updatedUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json(updatedUser);
  },
);
