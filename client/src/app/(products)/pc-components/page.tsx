import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Banner from "@/app/components/Navbar/Banner/Home/Banner";
import Footer from "@/app/components/Footer/Footer";
import { PcComponentProductList } from "@/app/components/products/pages/pc-components/ProductList";

const page = () => {
  return (
    <>
      <div className="">
        <main className="mt-20">
          <Navbar />
          <PcComponentProductList />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default page;
