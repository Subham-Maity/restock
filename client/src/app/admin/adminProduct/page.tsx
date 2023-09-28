import React from "react";
import { AdminPcComponentProductList } from "@/app/components/admin/components/AdminProductList";
import AdminProtected from "@/app/components/auth/components/protectedAdmin";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";

const Page = () => {
  return (
    <div>
      <Navbar />
      <AdminProtected>
        <AdminPcComponentProductList />
      </AdminProtected>
      <Footer />
    </div>
  );
};

export default Page;
