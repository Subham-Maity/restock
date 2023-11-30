"use client";

import Protected from "@/lib/providers/Protected/User/Protected";
import Cart from "@/components/cart/Cart";

import Footer from "@/components/Footer/Footer";
import TailwindWrapper from "@/lib/wrapper/UserPannel/TailwindWrapper";
import Navbar from "@/components/Navbar/Navbar";

const Page = () => {
  return (
    <div>
      <Navbar />
      <TailwindWrapper>
        <Cart />
      </TailwindWrapper>
        <Footer />
    </div>
  );
};

export default Page;
