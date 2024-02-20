"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const stripe_1 = require("../../../payments/stripe/stripe");
const catchAsyncError_1 = __importDefault(require("../../../error/catchAsyncError"));
exports.createPaymentIntent = (0, catchAsyncError_1.default)(async (req, res, _) => {
    const { totalAmount, orderId } = req.body;
    //Create a PaymentIntent with the order amount and currency to confirm the payment
    const paymentIntent = await stripe_1.stripe.paymentIntents.create({
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
});
