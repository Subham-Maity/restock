"use client"

import ProductDetailsSkeleton from "@/app/components/products/components/PcComponentsProductDetails/skeleton/ProductDetailsSkeleton";
import CartHoverOnMouse from "@/app/components/cart/CartHoverOnMouse";
import CustomButton from "@/app/components/CustomButton/CustomButton";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <CustomButton
        title="Sign up"
        type="submit"
        rightArrow
        animated
        onClick={() => {}}
      />
    </div>
  );
};

export default page;
