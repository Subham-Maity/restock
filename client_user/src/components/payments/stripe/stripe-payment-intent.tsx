"use client";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

import "./Stripe.css";

import StripeCheckoutForm from "@/components/payments/stripe/stripe-form-checkout";
import { selectCurrentOrder } from "@/lib/features/order/order-slice";
import { useAppSelector } from "@/store/redux/useSelector";
import { stripePromise } from "@/utils/stripe/get-stripejs";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useAppSelector(selectCurrentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      "http://localhost:5050/api/v1/payments/stripe/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: currentOrder.items }),
      },
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm />
        </Elements>
      )}
    </div>
  );
}
