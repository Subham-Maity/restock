import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";
import { PcComponentProductListOnSearch } from "@/app/components/products/pages/pc-components/ProductListOnSearch";


const page = () => {
  return (
    <>
      <div className="">

          <Navbar />
          <TailwindWrapper>
          <PcComponentProductListOnSearch />
          </TailwindWrapper>
      </div>
      <Footer />
    </>
  );
};

export default page;
