import { Request, Response, NextFunction } from 'express';
import Cart from '../../model/cart/cart.model.js';
import catchAsyncError from '../../middleware/catchAsyncError.js';
import ErrorHandler from '../../utils/errorHandler.js';

export const fetchCartByUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.query;
    try {
        const cartItems = await Cart.find({ user: user }).populate('product');

        res.status(200).json(cartItems);
    } catch (err) {
        res.status(400).json(err);
    }
});
export const addToCart = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const cart = new Cart(req.body);
    try {
        const doc = await cart.save();
        const result = await doc.populate('product');
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

export const deleteFromCart = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const doc = await Cart.findByIdAndDelete(id);
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
});


export const updateCart = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        const result = await cart.populate('product');

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});