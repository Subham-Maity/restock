"use client";
import "@/styles/globals.css";
import React from "react";
import NotAdmin from "@/loader/not-admin/not-admin";
import IfAdminRedirect from "@/security/protected-route/if-admin-redirect";

export default function Home() {
  return (
    <div className="mt-20 h-fit">
      <IfAdminRedirect>
        <NotAdmin />
      </IfAdminRedirect>
    </div>
  );
}
