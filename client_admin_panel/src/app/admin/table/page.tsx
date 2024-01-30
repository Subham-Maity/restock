import React from "react";
import DefaultNav from "@/components/admin/components/AdminNav/DefaultNav";
import AntTable from "@/components/admin/components/Table/AntTable";
import dynamic from "next/dynamic";

function Page() {
  return (
    <>
      {/*<AdminProtected>*/}
      <DefaultNav>
        <div className="w-screen">
          <AntTable />
        </div>
      </DefaultNav>
      {/*</AdminProtected>*/}
    </>
  );
}

// export default Page;
export default dynamic(() => Promise.resolve(Page), { ssr: false });
