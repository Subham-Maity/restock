import React from "react";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import PageMergin from "@/wrapper/page-mergin";
import CustomTabT1 from "@/components/product-t1/products/ui-change-tab/custom-tab-t1";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <PageMergin>
        <CustomTabT1 />
      </PageMergin>
    </IfUserThenIfAdmin>
  );
};

export default Page;
