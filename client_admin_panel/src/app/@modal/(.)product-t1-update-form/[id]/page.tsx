"use client";

import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import PageMergin from "@/wrapper/page-mergin";
import ActionContent from "@/components/product-t1/grid/admin/action/action-content";

const Page = () => {
  return (
    <>
      <IfUserThenIfAdmin>
        <PageMergin>
          <ActionContent />
        </PageMergin>
      </IfUserThenIfAdmin>
    </>
  );
};

export default Page;
