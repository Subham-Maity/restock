"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

import "./Stripe.css";

import StripeCheckoutForm from "@/components/payments/stripe/stripe-form-checkout";
import { selectCurrentOrder } from "@/lib/features/order/order-slice";
import { useAppSelector } from "@/store/redux/useSelector";
import { stripePromise } from "@/utils/stripe/get-stripejs";
import { useCreatePaymentIntent } from "@/lib/stripe/react-query-stripe";

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useAppSelector(selectCurrentOrder);
  const createPaymentIntent = useCreatePaymentIntent({
    items: currentOrder.items,
  });

  useEffect(() => {
    if (createPaymentIntent.isSuccess) {
      setClientSecret(createPaymentIntent.data);
    }
  }, [createPaymentIntent.isSuccess, createPaymentIntent.data]);

  useEffect(() => {
    createPaymentIntent.mutate();
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
