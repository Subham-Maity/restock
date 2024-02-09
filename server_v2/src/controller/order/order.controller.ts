import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../../error/catchAsyncError";
import {
  createNewOrder,
  deleteOrderById,
  findOrdersByUser,
} from "./model-controller/order.model.controller";
import { IOrder } from "../../types/order/order";
import { buildBaseQuery } from "./order-controller/sort";
import { paginateQuery } from "./order-controller/paginate";
import Order from "../../model/order/order.model"; /*FETCH ALL ORDERS*/

/*☑️ FETCH ALL ORDERS ☑️*/
export const fetchOrdersByUser = catchAsyncError(
  async (req: Request, res: Response, _: NextFunction) => {
    const { id } = req.user as { id: string };
    const orders = await findOrdersByUser(id);
    res.status(200).json(orders);
  },
);

//Todo: Create a new order with Email
/*☑️ Create a new order ☑️*/
export const createOrder = catchAsyncError(
  async (req: Request, res: Response, _: NextFunction) => {
    const doc = await createNewOrder(req.body as IOrder);
    res.status(201).json(doc);
  },
);

/*☑️ Delete an order ☑️*/
export const deleteOrder = catchAsyncError(
  async (req: Request, res: Response, _: NextFunction) => {
    const { id } = req.params as { id: string };
    const order = await deleteOrderById(id);
    res.status(200).json(order);
  },
);

/*☑️ Update an order ☑️*/
export const updateOrder = catchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  },
);

/*☑️ Fetch all orders ☑️*/
export const fetchAllOrders = catchAsyncError(
  async (req: Request, res: Response, _: NextFunction) => {
    let query = buildBaseQuery(req);
    let totalOrdersQuery = buildBaseQuery(req);

    query = paginateQuery(query, req);

    const docs = await query.exec();
    const totalDocs = await totalOrdersQuery.countDocuments().exec();
    res.set("X-Total-Count", totalDocs.toString());
    res.status(200).json(docs);
  },
);
