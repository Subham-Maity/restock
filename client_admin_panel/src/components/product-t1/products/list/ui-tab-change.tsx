import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import { AdminPcComponentProductList } from "@/components/product-t1/products/list/admin/product-main";
import { UserPcComponentProductList } from "@/components/product-t1/products/list/user/product-main";

const UiTabChange = () => {
  return (
    <Tabs defaultValue="admin">
      <TabsList className="default-card">
        <TabsTrigger value="admin">Admin View</TabsTrigger>
        <TabsTrigger value="user">User View</TabsTrigger>
      </TabsList>
      <TabsContent value="admin">
        <AdminPcComponentProductList />
      </TabsContent>
      <TabsContent value="user">
        <UserPcComponentProductList />
      </TabsContent>
    </Tabs>
  );
};

export default UiTabChange;
