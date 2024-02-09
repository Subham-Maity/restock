import React from "react";

import MarginWrapper from "@/wrapper/margin-wrapper";
import ProductMainPcDetails from "@/components/details/pc-product-details/product-main-pc-details";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import Dialog from "@/components/ui/custom-modal/route-modal";

const page = () => {
  async function onClose() {
    "use server";
  }

  return (
    <IfUserThenIfAdmin>
      <Dialog
        onClose={onClose}
        bg={true}
        buttonClass="cursor-pointer mt-4 rounded border-none w-6 h-6 font-bold text-white"
        bgClass="bg-white dark:bg-stone-800 rounded-2xl"
        closeButtonAlign="left"
      >
        <MarginWrapper>
          <ProductMainPcDetails />
        </MarginWrapper>
      </Dialog>
    </IfUserThenIfAdmin>
  );
};

export default page;
