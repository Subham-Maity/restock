import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import { AdminPcComponentProductList } from "@/components/product-t1/products/list/admin/product-main";
import { UserPcComponentProductList } from "@/components/product-t1/products/list/user/product-main";
import TableMain from "@/components/data-table/main";

const UiTabChange = () => {
  return (
    <Tabs defaultValue="admin">
      <TabsList className="default-card">
        <TabsTrigger value="admin">Admin View</TabsTrigger>
        <TabsTrigger value="user">User View</TabsTrigger>
        <TabsTrigger value="table">Table View</TabsTrigger>
      </TabsList>
      <TabsContent value="admin">
        <AdminPcComponentProductList />
      </TabsContent>
      <TabsContent value="user">
        <UserPcComponentProductList />
      </TabsContent>
      <TabsContent value="table">
        <TableMain />
      </TabsContent>
    </Tabs>
  );
};

export default UiTabChange;
