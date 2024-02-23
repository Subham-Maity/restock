// app/providers.tsx
"use client";

import React from "react";

import { NextUIProvider } from "@nextui-org/react";

export function NextUiProviders({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
