import * as express from "express";
import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  fetchAllOrders,
  fetchOrdersByUser,
  updateOrder
} from "../../controller/order/order.controller";


const order: Router = express.Router();

order
  .post("/orders", createOrder)
  .get("/orders/user/:userId", fetchOrdersByUser)
  .delete("/orders/:id", deleteOrder)
  .patch("/orders/:id", updateOrder)
  .get("/orders", fetchAllOrders);

export default order;
