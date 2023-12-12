import {Request, Response, NextFunction} from 'express';
import Order from "../../model/order/order.model.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";

/*FETCH ALL ORDERS*/
export const fetchOrdersByUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.query;
    try {
        const orders = await Order.find({ user: user });

        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
});


/*Create a new order*/
export const createOrder = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const order = new Order(req.body);
    try {
        const doc = await order.save();
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
});

/*Delete an order*/

export const deleteOrder = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndDelete(id);
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json(err);
    }
});


/*Update an order*/

export const updateOrder = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json(err);
    }
});
