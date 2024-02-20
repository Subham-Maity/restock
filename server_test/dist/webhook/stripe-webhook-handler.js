"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhook = void 0;
const stripe_1 = require("../payments/stripe/stripe");
const stripe_wh_setting_1 = require("./stripe-wh-setting");
const order_model_1 = __importDefault(require("../src/model/order/order.model"));
const handleStripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe_1.stripe.webhooks.constructEvent(req.body, sig, stripe_wh_setting_1.endpointSecret);
    }
    catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntentSucceeded = event.data.object;
            // TODO: Update the order payment status
            const order = await order_model_1.default.findById(paymentIntentSucceeded.metadata.orderId);
            // order.paymentStatus = 'received';
            // await order.save();
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
    }
    // Return a response to acknowledge receipt of the event
    res.send();
};
exports.handleStripeWebhook = handleStripeWebhook;
