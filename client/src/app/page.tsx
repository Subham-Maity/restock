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
  <div className="">
    <main className="mt-20">
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
