"use client";

import ProductDetailsSkeleton from "@/app/components/products/components/PcComponentsProductDetails/skeleton/ProductDetailsSkeleton";
import CartHoverOnMouse from "@/app/components/cart/CartHoverOnMouse";
import CustomButton from "@/app/components/CustomButton/CustomButton";
import { FaHandBackFist } from "react-icons/fa6";
import ProductListSkeleton from "@/app/components/products/pages/pc-components/skeleton/ProductListSkeleton";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <CustomButton
        className="relative inline-flex items-center justify-center sm:w-34 p-4 py-3 overflow-hidden font-medium text-indigo-500 transition duration-100 ease-out border-2 dark:border-indigo-500/30 rounded-2xl shadow-xl group"
        title="Ayoo"
        type="submit"
        onClick={() => {}}
        disabled={false}
      />
    </div>
  );
};

export default page;
