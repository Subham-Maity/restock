"use client";
import Image from "next/image";
import "./globals.css";
import { useState } from "react";
import Switcher from "@/app/components/Mode/Switcher";
import { HomeProductFilter } from "@/app/components/products/pages/Home/ProductList";

export default function Home() {
  return (
    <main>
      <HomeProductFilter />
    </main>
  );
}
