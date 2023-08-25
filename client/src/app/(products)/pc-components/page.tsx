import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Banner from "@/app/components/Navbar/Banner/Home/Banner";
import Footer from "@/app/components/Footer/Footer";
import { PcComponentProductList } from "@/app/components/products/pages/pc-components/ProductList";

const page = () => {
  return (
    <>
      <div className="lg:mx-6 xl:mx-9 2xl:mx-12">
        <main className="mt-28">
          <Navbar />
          <Banner />
          <PcComponentProductList />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default page;
