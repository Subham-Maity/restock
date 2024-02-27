"use client";
import "@/styles/globals.css";
import React from "react";

import IfUserThenIfAdmin from "@/providers/security/if-user-then-if-admin";
import PageMergin from "@/wrapper/page-mergin";
import UiTabChange from "@/components/product-t1/products/ui-tab-change";

export default function Home() {
  return (
    <IfUserThenIfAdmin>
      <PageMergin>
        <UiTabChange />
      </PageMergin>
    </IfUserThenIfAdmin>
  );
}
