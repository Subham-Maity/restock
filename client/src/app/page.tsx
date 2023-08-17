"use client";
import "./globals.css";
import Banner from "@/app/components/Navbar/Banner/Home/Banner";
import { PcComponentFilter } from "@/app/components/products/pages/pc-components/ProductList";

export default function Home() {
  return (
    <main>
      <Banner />
      <PcComponentFilter />
    </main>
  );
}
