import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import React from "react";
import AdminProductDetail from "@/app/components/admin/components/AdminProductDetail";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">
        <AdminProductDetail />
      </div>
      <Footer />
    </div>
  );
};

export default page;
