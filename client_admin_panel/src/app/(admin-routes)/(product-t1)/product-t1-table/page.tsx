import React from "react";

import DataTable from "@/components/product-t1/table/data-table";
import dynamic from "next/dynamic";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";

function Page() {
  return (
    <IfUserThenIfAdmin>
      <div className="w-screen">
        <DataTable />
      </div>
    </IfUserThenIfAdmin>
  );
}

// export default Page;
export default dynamic(() => Promise.resolve(Page), { ssr: false });
