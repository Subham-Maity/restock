import * as express from "express";
import {Router} from "express";
import {createOrder, deleteOrder, fetchOrdersByUser, updateOrder} from "../../controller/order/order.controller.js";


const router: Router = express.Router();


router
    .post('/', createOrder)
    .get('/', fetchOrdersByUser)
    .delete('/:id', deleteOrder)
    .patch('/:id', updateOrder)


export default router;