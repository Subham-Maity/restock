import Footer from "@/components/Footer/Footer";

import React from "react";
import TailwindWrapper from "@/lib/wrapper/UserPannel/TailwindWrapper";
import Navbar from "@/components/Navbar/Navbar";
import ProductDetails from "@/components/products/components/PcComponentsProductDetails/ProductDetails";

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
