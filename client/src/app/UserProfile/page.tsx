import React from "react";
import UserProfile from "@/app/components/user/components/UserProfile";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import Protected from "@/app/components/auth/components/Protected";

const Page = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl mt-24 mx-2">My Profile</h1>
      <Protected>
        <UserProfile />
      </Protected>
      <Footer />
    </div>
  );
};

export default Page;
