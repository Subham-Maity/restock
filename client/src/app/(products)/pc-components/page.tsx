"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";
import {PcComponentProductList} from "@/app/components/products/pages/pc-components/ProductList";


const page = () => {
  return (
    <>
      <div className="">

          <Navbar />
          <TailwindWrapper>
          <PcComponentProductList/>
          </TailwindWrapper>
      </div>
      <Footer />
    </>
  );
};

export default page;
