"use client";
import "@/styles/globals.css";
import React from "react";
import { AdminPcComponentProductList } from "@/components/product-t1/products/product-main";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import { TERipple } from "tw-elements-react";

export default function Home() {
  return (
    <IfUserThenIfAdmin>
      <AdminPcComponentProductList />
    </IfUserThenIfAdmin>
  );
}
