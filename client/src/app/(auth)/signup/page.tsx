import React from "react";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center">
        <div>
            <Signup />
        </div>
    </div>
  );
};

export default Page;
