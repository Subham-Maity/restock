import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import React from "react";
import AdminProductDetail from "@/app/components/admin/components/AdminProductDetail";
import TailwindWrapper from "@/app/components/TailwindWrapper/TailwindWrapper";

const page = () => {
  return (
    <div>
      <Navbar />
  <TailwindWrapper>
        <AdminProductDetail />
  </TailwindWrapper>
      <Footer />
    </div>
  );
};

export default page;
