import React from "react";
import UserOrders from "@/app/components/user/components/UserOrder";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import Protected from "@/app/components/auth/components/Protected";

const Page = () => {
  return (
    <div>
      <Navbar />
      <Protected>
        <div className="mt-24 mx-2">
          <UserOrders />
        </div>
      </Protected>
      <Footer />
    </div>
  );
};

export default Page;