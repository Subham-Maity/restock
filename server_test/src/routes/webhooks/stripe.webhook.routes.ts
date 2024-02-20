import * as express from "express";
import { Router } from "express";
import { handleStripeWebhook } from "../../../webhook/stripe-webhook-handler";

const stripeWebhook: Router = express.Router();

stripeWebhook.post(
  "/",
  express.raw({ type: "application/json" }),
  handleStripeWebhook,
);

export default stripeWebhook;
