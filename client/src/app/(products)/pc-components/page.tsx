"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";
import ProductListView from "@/app/components/products/pages/pc-components/ProductListView";

const page = () => {
  return (
    <>
      <div className="">

          <Navbar />
          <TailwindWrapper>
          <ProductListView/>
          </TailwindWrapper>
      </div>
      <Footer />
    </>
  );
};

export default page;
