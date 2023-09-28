import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import React from "react";
import AdminProductDetail from "@/app/components/admin/components/AdminProductDetail";
import AdminProtected from "@/app/components/auth/components/protectedAdmin";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">
        <AdminProtected>
          <AdminProductDetail />
        </AdminProtected>
      </div>
      <Footer />
    </div>
  );
};

export default page;
