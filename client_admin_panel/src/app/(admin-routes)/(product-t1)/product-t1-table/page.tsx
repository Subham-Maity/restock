import React from "react";

import DataTable from "@/components/product-t1/products/table/optional/data-table";
import dynamic from "next/dynamic";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import PageMergin from "@/wrapper/page-mergin";

function Page() {
  return (
    <IfUserThenIfAdmin>
      <PageMergin>
        <DataTable />
      </PageMergin>
    </IfUserThenIfAdmin>
  );
}

// export default Page;
export default dynamic(() => Promise.resolve(Page), { ssr: false });
