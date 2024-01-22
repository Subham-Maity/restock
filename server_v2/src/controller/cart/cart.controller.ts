import { NextFunction, Request, Response } from "express";

import catchAsyncError from "../../middleware/error/catchAsyncError";
import { validationResult } from "express-validator";
import ErrorHandler from "../../utils/errorHandler/errorHandler";
import {
  deleteCart,
  fetchCartByUser,
  saveCart,
  updateCart,
} from "./cart.model.controller";
import { IUser } from "../../types/user/user";

/*☑️ GET CART BY USER ☑️ */
export const getCartByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorHandler(
        errors
          .array()
          .map((err) => err.msg)
          .join(", "),
        400,
      ),
    );
  }
  const user = req.user as IUser;

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  try {
    const cartItems = await fetchCartByUser(user.id);

    if (!cartItems) {
      return next(new ErrorHandler("No cart items found for this user", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        cartItems,
      },
    });
  } catch (error) {
    next(error);
  }
};

/*☑️ ADD TO CART ☑️ */
export interface User {
  id: string;
}

export const addProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorHandler(
        errors
          .array()
          .map((err) => err.msg)
          .join(", "),
        400,
      ),
    );
  }
  try {
    // Check if req.user is defined
    if (!req.user) {
      throw new ErrorHandler("User is not authenticated", 401);
    }

    const { id } = req.user as User;
    const cartItem = await saveCart({ ...req.body, user: id });

    res.status(201).json({
      status: "success",
      data: {
        cartItem,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

/*☑️ DELETE FROM CART ☑️ */
export const deleteProductFromCart = [
  // validation rules
  // controller
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new ErrorHandler(
          errors
            .array()
            .map((err) => err.msg)
            .join(", "),
          400,
        ),
      );
    }

    try {
      const { id } = req.params;
      const deletedCartItem = await deleteCart(id);

      if (!deletedCartItem) {
        return next(new ErrorHandler("No cart item found with this id", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          deletedCartItem,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  },
];

/*☑️ UPDATE CART BY ID ☑️ */
export const updateCartById = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new ErrorHandler(
          errors
            .array()
            .map((err) => err.msg)
            .join(", "),
          400,
        ),
      );
    }

    const id = req.params.id;

    try {
      const updatedCart = await updateCart(id, req.body);
      res.status(200).json(updatedCart);
    } catch (error) {
      next(error);
    }
  },
);
