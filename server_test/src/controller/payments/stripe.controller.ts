import { stripe } from "../../../payments/stripe/stripe";
import catchAsyncError from "../../../error/catchAsyncError";
import { NextFunction, Request, Response } from "express";

export const createPaymentIntent = catchAsyncError(
  async (req: Request, res: Response, _: NextFunction) => {
    const { totalAmount, orderId } = req.body;

    //Create a PaymentIntent with the order amount and currency to confirm the payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, //amount in cents
      currency: "inr", //currency code
      automatic_payment_methods: {
        enabled: true, //This is to enable automatic confirmation of the payment intent
      },
      metadata: {
        orderId,
      },
    });

    //This is the client secret that will be used in the frontend to confirm the payment intent
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
);
