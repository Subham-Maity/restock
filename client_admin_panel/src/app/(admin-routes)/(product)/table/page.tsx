import React from "react";

import ProductPcTable from "@/components/table/pc-product-tables/product-pc-table";
import dynamic from "next/dynamic";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";

function Page() {
  return (
    <IfUserThenIfAdmin>
      <div className="w-screen">
        <ProductPcTable />
      </div>
    </IfUserThenIfAdmin>
  );
}

// export default Page;
export default dynamic(() => Promise.resolve(Page), { ssr: false });
