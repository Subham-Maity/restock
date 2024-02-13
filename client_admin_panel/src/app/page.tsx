"use client";
import "@/styles/globals.css";
import React from "react";
import { AdminPcComponentProductList } from "@/components/products/product-main-pc";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import { TERipple } from "tw-elements-react";

export default function Home() {
  return (
    <IfUserThenIfAdmin>
      <TERipple>Button</TERipple>
      <AdminPcComponentProductList />
    </IfUserThenIfAdmin>
  );
}
