"use client";
import React from "react";
import UserProtected from "@/security/protected-route/user-protected";

//Only use in the root of the app
const IfUserThenIfAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <UserProtected>{children}</UserProtected>
    </div>
  );
};

export default IfUserThenIfAdmin;
