import React from "react";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import PageMergin from "@/wrapper/page-mergin";
import UiTabChange from "@/components/product-t1/products/list/ui-tab-change";

const Page = () => {
  return (
    <IfUserThenIfAdmin>
      <PageMergin>
        <UiTabChange />
      </PageMergin>
    </IfUserThenIfAdmin>
  );
};

export default Page;
