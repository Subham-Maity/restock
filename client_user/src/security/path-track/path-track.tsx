"use client";
import React, { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import Context from "@/store/context/context";

const RouteTracker = ({ children }: { children: React.ReactNode }) => {
  const { setPrevPath } = useContext(Context);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/login") {
      setPrevPath(pathname);
    }
  }, [pathname, setPrevPath]);

  return <>{children}</>;
};

export default RouteTracker;
