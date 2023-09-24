import React from "react";
import UserProfile from "@/app/components/user/components/UserProfile";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import Protected from "@/app/components/auth/components/Protected";

const Page = () => {
  return (
    <div>
      <Navbar />

      <Protected>
        <div className="mt-24 mx-2">
          <UserProfile />
        </div>
      </Protected>
      <Footer />
    </div>
  );
};

export default Page;
