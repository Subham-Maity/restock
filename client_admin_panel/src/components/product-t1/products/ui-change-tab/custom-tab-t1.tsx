import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import { AdminPcComponentProductList } from "@/components/product-t1/products/admin-product-main/product-main";
import { UserPcComponentProductList } from "@/components/product-t1/products/user-product-main/product-main";

const CustomTabT1 = () => {
  return (
    <Tabs defaultValue="admin">
      <TabsList>
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

export default CustomTabT1;
