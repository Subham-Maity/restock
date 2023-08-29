import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://restock-api.onrender.com",
  }),
  endpoints: (builder) => ({
    getProductByName: builder.query({
      query: () => `products`,
    }),
  }),
});

export const { useGetProductByNameQuery } = productsAPI;
