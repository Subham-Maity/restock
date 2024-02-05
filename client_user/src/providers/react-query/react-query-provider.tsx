"use client";
import React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/cache/react-query/react-query";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
