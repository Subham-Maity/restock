import Stripe from "stripe";
import { stripe_api_key, stripe_api_version } from "./stripe-setting";

export const stripe = new Stripe(stripe_api_key as string, {
  apiVersion: stripe_api_version,
  appInfo: {
    name: "restock",
    url: "https://restock.app",
  },
});
