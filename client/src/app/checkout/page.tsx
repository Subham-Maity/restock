import React from "react";
import Checkout from "@/components/Checkout/Checkout";

import Footer from "@/components/Footer/Footer";
import Protected from "@/lib/providers/Protected/User/Protected";
import TailwindWrapper from "@/lib/wrapper/UserPannel/TailwindWrapper";
import Navbar from "@/components/Navbar/Navbar";

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
