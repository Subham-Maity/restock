"use client";
import "./globals.css";

import React from "react";
import OurFacts from "@/components/total-view/total-view";
import HomeFooter from "@/components/common/home/home-footer";
import HomeTopNav from "@/components/common/home/home-top-nav";
import HomeBanner from "@/components/common/home/home-banner/home-banner";
import { PcComponentProductList } from "@/components/products/product-main-pc";

export default function Home() {
  return (
    <>
      <div className="">
        <main className="">
          <HomeTopNav />
          <HomeBanner />
          <PcComponentProductList />
          <OurFacts />
        </main>
      </div>
      <HomeFooter />
    </>
  );
}
