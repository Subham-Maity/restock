"use client";
import "@/styles/globals.css";
import React from "react";
import { AdminPcComponentProductList } from "@/components/products/product-main-pc";
import Layout from "@/app/layout/layout";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";

export default function Home() {
  return (
    <IfUserThenIfAdmin>
      <Layout>
        <AdminPcComponentProductList />
      </Layout>
    </IfUserThenIfAdmin>
  );
}
