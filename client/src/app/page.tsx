"use client";
import "./globals.css";
import Banner from "@/app/components/Navbar/Banner/Home/Banner";
import { PcComponentFilter } from "@/app/components/products/pages/pc-components/ProductList";
import Carousel from "@/app/components/Carousel/Home/Carousel";

export default function Home() {
  return (
    <main>
      <Banner />
      <PcComponentFilter />
    </main>
  );
}
