"use client";
import "@/styles/globals.css";
import React from "react";
import { AdminPcComponentProductList } from "@/components/product-t1/products/product-main";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import PageMergin from "@/wrapper/page-mergin";

export default function Home() {
  return (
    <IfUserThenIfAdmin>
      <PageMergin>
        <AdminPcComponentProductList />
      </PageMergin>
    </IfUserThenIfAdmin>
  );
}
