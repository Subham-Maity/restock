"use client";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import React, { useContext } from "react";
import { MousePointerClick } from "lucide-react";
import { useRouter } from "next/navigation";
import { REDIRECT_TO_THE_PRODUCT_LIST } from "@/links/product-update";
import { motion } from "framer-motion";
import Context from "@/store/context/context";
import { isValidObjectId } from "@/components/product-t1/operation/product/update/no-url-parameter/validation";
// Define your animation variants
const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const MousePointerClickVariants = {
  tap: { rotate: 20 },
};
export default function NoUrlParameter() {
  const router = useRouter();
  const { product, setProduct } = useContext(Context);

  if (product.id && isValidObjectId(product.id)) {
    router.push(`/product-t1-update-form/update/${product.id}`);
  }

  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="#5a5a5a"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="md:text-5xl text-3xl lg:text-4xl font-bold text-center text-white relative z-20">
        Please Admin, Select the desired product from the list to update it.
      </h1>

      <motion.button
        className="z-20 inline-flex h-12  items-center justify-center mt-12 rounded-md dark:bg-[linear-gradient(110deg,#222224,45%,#1e2631,55%,#2a2a2d)] dark:bg-[length:200%_100%] bg-[length:200%_100%] bg-[linear-gradient(110deg,#edeeef,45%,#a1a1a2,55%,#f9f9f9)]  dark:text-[#919eab] text-[#837c78] border border-gray-300/20 shadow-2xl rounded-lg px-6 font-medium text-slate-400 transition-colors focus:outline-none"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => router.push(REDIRECT_TO_THE_PRODUCT_LIST)}
      >
        <motion.div variants={MousePointerClickVariants}>
          <MousePointerClick className="mr-0.5" />
        </motion.div>
        Click here
      </motion.button>
    </div>
  );
}
