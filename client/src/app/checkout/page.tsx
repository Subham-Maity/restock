import React from "react";
import Checkout from "@/app/components/Checkout/Checkout";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import Protected from "@/app/components/auth/components/Protected";

const Page = () => {
  return (
    <div>
      <div className="mb-20">
        <Navbar />
      </div>
      <Protected>
        <Checkout />
      </Protected>
      <Footer />
    </div>
  );
};

export default Page;
