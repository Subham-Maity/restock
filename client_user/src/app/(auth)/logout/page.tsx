import React from "react";
import Logout from "@/components/auth/logout/logout";
import TopLoader from "@/loader/top-loader/top-loader";

const Page = () => {
  return (
    <div>
      <TopLoader>
        <Logout />
      </TopLoader>
    </div>
  );
};

export default Page;
