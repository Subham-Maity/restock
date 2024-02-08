import React from "react";

import Dialog from "@/components/ui/custom-modal/route-modal";
import ProductForm from "@/components/update/products/update-pc-product-form";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";

const Page = () => {
  //Route Name
  // login/?showDialog=y

  async function onClose() {
    "use server";
    console.log("Ok was clicked");
  }

  return (
    <IfUserThenIfAdmin>
      {/*<Dialog title="Example Modal" onClose={onClose} onOk={onOk}>*/}
      <Dialog
        onClose={onClose}
        bg={true}
        buttonClass="cursor-pointer mt-4 rounded border-none w-6 h-6 font-bold text-white"
        bgClass="bg-white dark:bg-stone-800 rounded-2xl"
        closeButtonAlign="left"
      >
        <ProductForm />
      </Dialog>
    </IfUserThenIfAdmin>
  );
};

export default Page;
