import { NextFunction, Request, Response } from "express";

import catchAsyncError from "../../middleware/error/catchAsyncError";

import {
  deleteCart,
  fetchCartByUser,
  saveCart,
  updateCart,
} from "./cart.model.controller";
import { IUser } from "../../types/user/user";
import ErrorHandler from "../../middleware/error/errorHandler";
import { isValidObjectId } from "mongoose";

/*☑️ GET CART BY USER ☑️ */
export const getCartByUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as IUser;
    // Check if the provided ID is valid
    if (!id || !isValidObjectId(id)) {
      return next(new ErrorHandler("Invalid cart ID", 400));
    }
    const cartItems = await fetchCartByUser(id);

    if (!cartItems) {
      return next(new ErrorHandler("Cart items not found", 404));
    }
    res.status(200).json(cartItems);
  },
);

/*☑️ ADD TO CART ☑️ */

export const addProductToCart = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as IUser;
    // Check if the provided ID is valid
    if (!id || !isValidObjectId(id)) {
      return next(new ErrorHandler("Invalid cart ID", 400));
    }
    const cartItem = await saveCart({ ...req.body, user: id });
    if (!cartItem) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to add product to cart",
      });
    }
    res.status(201).json(cartItem);
  },
);

/*☑️ DELETE FROM CART ☑️ */
export const deleteProductFromCart = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    // Check if the provided ID is valid
    if (!id || !isValidObjectId(id)) {
      return next(new ErrorHandler("Invalid cart ID", 400));
    }
    const deletedCartItem = await deleteCart(id);

    if (!deletedCartItem) {
      return next(new ErrorHandler("No cart item found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        deletedCartItem,
      },
    });
  },
);

/*☑️ UPDATE CART BY ID ☑️ */
export const updateCartById = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    // Check if the provided ID is valid
    if (!id || !isValidObjectId(id)) {
      return next(new ErrorHandler("Invalid cart ID", 400));
    }
    const updatedCart = await updateCart(id, req.body);
    if (!updatedCart) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to update cart",
      });
    }
    res.status(200).json(updatedCart);
  },
);
