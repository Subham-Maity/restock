import React from "react";
import UserOrders from "@/app/components/user/components/UserOrder";
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
          <UserOrders />
        </TailwindWrapper>
      </Protected>
      <Footer />
    </div>
  );
};

export default Page;
