import {Request, Response, NextFunction} from 'express';
import Order from "../../model/order/order.model.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";

/*FETCH ALL ORDERS*/
export const fetchOrdersByUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ user: userId });

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


export const fetchAllOrders = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    let query = Order.find({deleted:{$ne:true}});
    let totalOrdersQuery = Order.find({deleted:{$ne:true}});


    if (req.query._sort && req.query._order) {
        const sortField = req.query._sort as string;
        const sortOrder = req.query._order as string;

        const sortCriteria: { [key: string]: 'asc' | 'desc' } = {};
        sortCriteria[sortField] = sortOrder as 'asc' | 'desc';

        query = query.sort(sortCriteria);
    }

    const totalDocs = await totalOrdersQuery.count().exec();
    console.log({ totalDocs });

    if (req.query._page && req.query._limit) {
        const pageSize = parseInt(req.query._limit as string);
        const page = parseInt(req.query._page as string);
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const docs = await query.exec();
        res.set('X-Total-Count', totalDocs.toString());
        res.status(200).json(docs);
    } catch (err) {
        res.status(400).json(err);
    }
});