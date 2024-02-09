import React from "react";
import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import Dialog from "@/components/ui/custom-modal/route-modal";

export default function Template({ children }: { children: React.ReactNode }) {
  async function onClose() {
    "use server";
  }

  return (
    <div>
      <IfUserThenIfAdmin>
        <Dialog
          onClose={onClose}
          bg={true}
          buttonClass="cursor-pointer mt-4 rounded border-none w-6 h-6 font-bold text-white"
          bgClass="bg-white dark:bg-stone-800 rounded-2xl"
          closeButtonAlign="left"
        >
          {children}
        </Dialog>
      </IfUserThenIfAdmin>
    </div>
  );
}
