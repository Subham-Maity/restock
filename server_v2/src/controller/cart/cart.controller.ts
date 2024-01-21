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

/*☑️ GET CART BY USER ☑️ */
export const getCartByUser = catchAsyncError(
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

    const user = req.query.user;
    if (typeof user !== "string") {
      return next(
        new ErrorHandler("User query parameter must be a string", 400),
      );
    }

    try {
      const cartItems = await fetchCartByUser(user);
      res.status(200).json(cartItems);
    } catch (error) {
      next(error);
    }
  },
);

/*☑️ ADD TO CART ☑️ */
export const addToCart = catchAsyncError(
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
      const savedCart = await saveCart(req.body);
      res.status(201).json(savedCart);
    } catch (error) {
      next(error);
    }
  },
);

/*☑️ DELETE FROM CART ☑️ */
export const deleteFromCart = catchAsyncError(
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
      const deletedCart = await deleteCart(id);
      res.status(200).json(deletedCart);
    } catch (error) {
      next(error);
    }
  },
);

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
