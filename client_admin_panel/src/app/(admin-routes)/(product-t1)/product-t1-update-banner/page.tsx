import React from "react";
import UpdateBanner from "@/components/product-t1/update/update-banner";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <UpdateBanner />
    </IfUserThenIfAdmin>
  );
};

export default Page;
