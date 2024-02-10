import { BASE_URL } from "@/constant/constants";

export const createPaymentIntent = async (intentBody: any) => {
  const response = await fetch(
    `${BASE_URL}/payments/stripe/create-payment-intent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(intentBody),
    },
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.clientSecret;
};
