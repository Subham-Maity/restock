"use client";

import Protected from "@/app/components/auth/components/Protected";
import Cart from "@/app/components/cart/Cart";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";

const Page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-24">
        <Cart />
      </div>

      <Footer />
    </div>
  );
};

export default Page;
