"use client";

import Protected from "@/app/components/auth/components/Protected";
import Cart from "@/app/components/cart/Cart";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";

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
