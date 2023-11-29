import React from "react";

import AdminProtected from "@/app/components/auth/components/protectedAdmin";
import DefaultLayout from "@/app/components/admin/components/AdminNav/DefaultNav";
import AntTable from "@/app/components/admin/components/Table/AntTable";

function Page() {
  return (
    <>
      {/*<AdminProtected>*/}
      <DefaultLayout>
        <AntTable />
      </DefaultLayout>
      {/*</AdminProtected>*/}
    </>
  );
}

export default Page;
