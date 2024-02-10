import * as express from "express";
import { Router } from "express";
import { createPaymentIntent } from "../../controller/payments/stripe.controller";

const stripe: Router = express.Router();

stripe.post("/create-payment-intent", createPaymentIntent);

export default stripe;
