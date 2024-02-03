"use client";
import "@/styles/globals.css";
import React from "react";
import { AdminPcComponentProductList } from "@/components/products/product-main-pc";
import AdminProtected from "@/security/protected-route/admin-protected";
import Layout from "@/components/layout/layout";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <AdminProtected>
        <Layout>
          <Link href={"/login?showDialog=y"}>Create Product</Link>
          <AdminPcComponentProductList />
        </Layout>
      </AdminProtected>
    </div>
  );
}
