import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import React from "react";
import AdminProductDetail from "@/app/components/admin/components/AdminProductDetail";
import AdminProtected from "@/app/components/auth/components/protectedAdmin";
import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">
        <Navbar />
        <AdminProtected>
            <TailwindWrapper>
          <AdminProductDetail />
        </TailwindWrapper>
        </AdminProtected>
        <Footer />
      </div>
      <Footer />
    </div>
  );
};

export default page;
