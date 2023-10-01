import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import ProductDetails from "@/app/components/products/components/PcComponentsProductDetails/ProductDetails";
import React from "react";
import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";

const page = () => {
  return (
    <div>
      <Navbar />
      <TailwindWrapper>
        <ProductDetails />
      </TailwindWrapper>
      <Footer />
    </div>
  );
};

export default page;