import * as express from "express";
import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  fetchAllOrders,
  fetchOrdersByUser,
  updateOrder,
} from "../../controller/order/order.controller";

const order: Router = express.Router();

order
  .post("/", createOrder)
  .get("/own", fetchOrdersByUser)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder)
  .get("/", fetchAllOrders);

export default order;
