import { useMutation, useQueryClient } from "react-query";
import { createPaymentIntent } from "@/api/stripe/stripe-fetch";

export const useCreatePaymentIntent = (intentBody: any) => {
  const queryClient = useQueryClient();

  return useMutation(() => createPaymentIntent(intentBody), {
    onSuccess: (clientSecret) => {
      queryClient.setQueryData("clientSecret", clientSecret);
    },
  });
};
