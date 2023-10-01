import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Banner from "@/app/components/Navbar/Banner/Home/Banner";
import Footer from "@/app/components/Footer/Footer";
import { PcComponentProductList } from "@/app/components/products/pages/pc-components/ProductList";
import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";

const page = () => {
  return (
    <>
      <div className="">

          <Navbar />
          <TailwindWrapper>
          <PcComponentProductList />
          </TailwindWrapper>
      </div>
      <Footer />
    </>
  );
};

export default page;
