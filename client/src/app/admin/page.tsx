import React from "react";
import { AdminPcComponentProductList } from "@/app/components/admin/components/AdminProductList";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import AdminProtected from "@/app/components/auth/components/protectedAdmin";
import DefaultLayout from "@/app/components/admin/components/AdminNav/DefaultNav";
import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";

const Page = () => {
  return (
    <div>
      <AdminProtected>
        <DefaultLayout>
            <AdminPcComponentProductList />
        </DefaultLayout>
      </AdminProtected>
    </div>
  );
};

export default Page;
