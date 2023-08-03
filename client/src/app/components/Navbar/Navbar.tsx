import React from "react";
import Link from "next/link";
import Switcher from "@/app/components/Mode/Switcher";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Brand Store",
    url: "/brand",
  },
  {
    id: 3,
    title: "Laptop",
    url: "/",
  },
  {
    id: 4,
    title: "Pre",
    url: "/",
  },
  {
    id: 5,
    title: "Home",
    url: "/",
  },
];

const Navbar = () => {
  return (
    <>
      <div className="bg-gray-800">
        <Switcher />
        {links.map((link: any) => (
          <Link key={link.id} href={link.url}>
            {link.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
