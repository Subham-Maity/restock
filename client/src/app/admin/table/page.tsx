import React from "react";

import AdminProtected from "@/lib/providers/Protected/Admin/protectedAdmin";
import DefaultNav from "@/components/admin/components/AdminNav/DefaultNav";
import AntTable from "@/components/admin/components/Table/AntTable";
import Navbar from "@/components/Navbar/Navbar";

function Page() {
  return (
    <>
      {/*<AdminProtected>*/}
      <DefaultNav>
        <AntTable />
      </DefaultNav>
      {/*</AdminProtected>*/}
    </>
  );
}

export default Page;
