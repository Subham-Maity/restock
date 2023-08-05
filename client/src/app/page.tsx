"use client";
import Image from "next/image";
import "./globals.css";
import React, { useState } from "react";
import Switcher from "@/app/components/Mode/Switcher";
import { HomeProductFilter } from "@/app/components/products/pages/Home/ProductList";
import Banner from "@/app/components/Navbar/Banner/Home/Banner";

export default function Home() {
  return (
    <main>
      <Banner />
      <HomeProductFilter />
    </main>
  );
}
