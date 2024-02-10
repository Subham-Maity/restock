import { stripe } from "../../../payments/stripe/stripe";
import catchAsyncError from "../../../error/catchAsyncError";
import { NextFunction, Request, Response } from "express";

const calculateOrderAmount = (items: any[]): number => {
  return 1400;
};

export const createPaymentIntent = catchAsyncError(
  async (req: Request, res: Response, _: NextFunction) => {
    const { items } = req.body;

    //Create a PaymentIntent with the order amount and currency to confirm the payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    //This is the client secret that will be used in the frontend to confirm the payment intent
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
);
