import React from "react";
import { AdminPcComponentProductList } from "@/app/components/admin/components/AdminProductList";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import AdminProtected from "@/app/components/auth/components/protectedAdmin";

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
