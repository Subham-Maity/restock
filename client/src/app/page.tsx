"use client";
import "./globals.css";
import Banner from "@/app/components/Navbar/Banner/Home/Banner";
import { PcComponentFilter } from "@/app/components/products/pages/pc-components/ProductList";
import Navbar from "@/app/components/Navbar/Navbar";
import React from "react";
import OurFacts from "@/app/components/Carousel/Carousel2";
import Footer from "@/app/components/Footer/Footer";

export default function Home() {
  return (
      <>
  <div className="lg:mx-6 xl:mx-9 2xl:mx-12">
    <main className="mt-28">
        <Navbar />
        <Banner />
        <PcComponentFilter />
        <OurFacts />

    </main>
  </div>
    <Footer />
    </>
  );
}
