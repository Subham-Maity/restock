"use client";
import "./globals.css";

import React, {useEffect} from "react";
import OurFacts from "@/components/siteStats/SiteStats";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Banner from "@/components/Navbar/Banner/Home/Banner";
import {PcComponentProductList} from "@/components/products/pages/pc-components/ProductList";



export default function Home() {
  return (
    <>
      <div className="">
        <main className="">
          <Navbar />
          <Banner />
            <PcComponentProductList/>
          <OurFacts />
        </main>
      </div>
      <Footer />
    </>
  );
}
