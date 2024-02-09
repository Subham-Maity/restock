import React from "react";

import ProductPcTable from "@/components/table/pc-product-tables/product-pc-table";
import dynamic from "next/dynamic";
import DefaultNav from "@/app/layout/layout";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";

function Page() {
  return (
    <IfUserThenIfAdmin>
      <DefaultNav>
        <div className="w-screen">
          <ProductPcTable />
        </div>
      </DefaultNav>
    </IfUserThenIfAdmin>
  );
}

// export default Page;
export default dynamic(() => Promise.resolve(Page), { ssr: false });
