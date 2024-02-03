import React from "react";
import UpdateBanner from "@/components/update/banner/update-banner";
import AdminProtected from "@/security/protected-route/admin-protected";

const Page = () => {
  return (
    <div>
      <AdminProtected>
        <UpdateBanner />
      </AdminProtected>
    </div>
  );
};

export default Page;
