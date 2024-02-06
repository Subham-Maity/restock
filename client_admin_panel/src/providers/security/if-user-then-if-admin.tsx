import React from "react";
import UserProtected from "@/security/protected-route/user-protected";
import AdminProtected from "@/security/protected-route/admin-protected";

//Only use in the root of the app
const IfUserThenIfAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <UserProtected>
        <AdminProtected>{children}</AdminProtected>
      </UserProtected>
    </div>
  );
};

export default IfUserThenIfAdmin;
