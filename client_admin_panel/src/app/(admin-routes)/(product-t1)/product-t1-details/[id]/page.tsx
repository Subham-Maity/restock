import React from "react";

import MarginWrapper from "@/wrapper/margin-wrapper";
import Details from "@/components/product-t1/products/details/details";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import Dialog from "@/components/ui/custom-modal/route-modal";
import PageMergin from "@/wrapper/page-mergin";

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
        <PageMergin>
          <Details />
        </PageMergin>
      </Dialog>
    </IfUserThenIfAdmin>
  );
};

export default page;
