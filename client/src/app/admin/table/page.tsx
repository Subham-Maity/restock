import React from "react";
import TableType from "@/app/components/admin/components/Table/TableType";
import AdminProtected from "@/app/components/auth/components/protectedAdmin";
import DefaultLayout from "@/app/components/admin/components/AdminNav/DefaultNav";
function Page() {
  return (
    <>
      {/*<AdminProtected>*/}
      <DefaultLayout>
        <TableType />
      </DefaultLayout>
      {/*</AdminProtected>*/}
    </>
  );
}

export default Page;
