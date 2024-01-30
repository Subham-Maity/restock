import React from "react";

import ProductPcTable from "@/components/details/pc-product-tables/product-pc-table";
import dynamic from "next/dynamic";
import DefaultNav from "@/components/layout/layout";

function Page() {
  return (
    <>
      {/*<AdminProtected>*/}
      <DefaultNav>
        <div className="w-screen">
          <ProductPcTable />
        </div>
      </DefaultNav>
      {/*</AdminProtected>*/}
    </>
  );
}

// export default Page;
export default dynamic(() => Promise.resolve(Page), { ssr: false });
