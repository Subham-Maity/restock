import React from "react";
import Checkout from "@/app/components/Checkout/Checkout";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import Protected from "@/app/components/auth/components/Protected";
import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";

const Page = () => {
  return (
    <div>
        <Navbar />
      <Protected>
          <TailwindWrapper>
        <Checkout />
          </TailwindWrapper>
      </Protected>
      <Footer />
    </div>
  );
};

export default Page;
