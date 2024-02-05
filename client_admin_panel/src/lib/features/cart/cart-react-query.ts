import { useMutation, useQuery, useQueryClient } from "react-query";
import { addToCartQuery } from "@/api/cart/add-to-cart";
import { deleteItemFromCartQuery } from "@/api/cart/dalete-item-from-cart";
import { fetchItemsByUserIdQuery } from "@/api/cart/fetch-item-by-user";
import { resetCartQuery } from "@/api/cart/reset-cart";
import { updateCartQuery } from "@/api/cart/update-cart";

export const queryOptions = {
  keepPreviousData: false,
  staleTime: 0,
  cacheTime: 0,
  refetchOnMount: true,
  refetchOnReconnect: true,
  refetchOnWindowFocus: true,
};

// Add item to cart
export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation(addToCartQuery, {
    ...queryOptions,
    onSuccess: () => {
      queryClient
        .invalidateQueries("cart")
        .then(() => {
          console.log("Cart query invalidated and fetched successfully");
        })
        .catch((error) => {
          console.error("Error invalidating and fetching cart query:", error);
        });
    },
  });
}

// Delete item from cart
export function useDeleteItemFromCart() {
  const queryClient = useQueryClient();
  return useMutation(deleteItemFromCartQuery, {
    ...queryOptions,
    onSuccess: () => {
      queryClient
        .invalidateQueries("cart")
        .then(() => {
          console.log("Cart query invalidated and fetched successfully");
        })
        .catch((error) => {
          console.error("Error invalidating and fetching cart query:", error);
        });
    },
  });
}

// Fetch items by user ID
export function useFetchItemsByUserId() {
  return useQuery("cart", fetchItemsByUserIdQuery, queryOptions);
}

// Reset cart
export function useResetCart() {
  const queryClient = useQueryClient();
  return useMutation(resetCartQuery, {
    ...queryOptions,
    onSuccess: () => {
      queryClient
        .invalidateQueries("cart")
        .then(() => {
          console.log("Cart query invalidated and fetched successfully");
        })
        .catch((error) => {
          console.error("Error invalidating and fetching cart query:", error);
        });
    },
  });
}

// Update cart
export function useUpdateCart() {
  const queryClient = useQueryClient();
  return useMutation(updateCartQuery, {
    ...queryOptions,
    onSuccess: () => {
      queryClient
        .invalidateQueries("cart")
        .then(() => {
          console.log("Cart query invalidated and fetched successfully");
        })
        .catch((error) => {
          console.error("Error invalidating and fetching cart query:", error);
        });
    },
  });
}
