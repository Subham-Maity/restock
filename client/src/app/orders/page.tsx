import React from "react";
import UserOrders from "@/components/user/UserOrder";

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
          <UserOrders />
        </TailwindWrapper>
      </Protected>
      <Footer />
    </div>
  );
};

export default Page;
