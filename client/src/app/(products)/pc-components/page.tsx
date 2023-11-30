"use client";
import React from "react";

import Footer from "@/components/Footer/Footer";
import TailwindWrapper from "@/lib/wrapper/UserPannel/TailwindWrapper";
import Navbar from "@/components/Navbar/Navbar";
import {PcComponentProductList} from "@/components/products/pages/pc-components/ProductList";



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
