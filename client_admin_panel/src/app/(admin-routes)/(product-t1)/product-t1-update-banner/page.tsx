import React from "react";
import UpdateBanner from "@/components/product-t1/operation/banner/update-banner";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import PageMergin from "@/wrapper/page-mergin";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <PageMergin>
        <UpdateBanner />
      </PageMergin>
    </IfUserThenIfAdmin>
  );
};

export default Page;
