import React from "react";
import {
  headingClasses,
  headingName,
} from "@/components/common/home/home-side-nav/config/side-nav-setting";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { SidenavOpeCloseProps } from "@/components/common/home/home-side-nav/config/sidenav-interface";

export default function SidenavOpenClose({ open }: SidenavOpeCloseProps) {
  return (
    <div className={`${open ? "flex w-full justify-between py-2" : ""}`}>
      {open && <h1 className={headingClasses}>{headingName}</h1>}
      <div className="transition duration-500 ease-in-out transform">
        {open ? (
          <AiOutlineMenuFold className="text-2xl text-center mx-auto dark:text-[#7BFE88] text-[#0ac31c]" />
        ) : (
          <AiOutlineMenuUnfold className="text-2xl text-center mx-auto " />
        )}
      </div>
    </div>
  );
}
