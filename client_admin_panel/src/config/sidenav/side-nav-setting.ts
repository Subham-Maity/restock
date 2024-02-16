import { AiOutlineHome } from "react-icons/ai";
import { RiComputerLine } from "react-icons/ri";
import { FaCaretRight } from "react-icons/fa";
import { NavItem } from "@/components/nav/sidenav/config/sidenav-interface";
import { MdDashboard } from "react-icons/md";
import { LuCircle } from "react-icons/lu";

//This is the config for the side nav items
export const navConfig: NavItem[] = [
  {
    title: "Home",
    href: "#",
    icon: AiOutlineHome,
  },
  {
    title: "Dashboard",
    href: "/table",
    icon: MdDashboard,
    subNav: [
      {
        title: "Sub Nav 1",
        href: "#",
        icon: LuCircle,
        subNav: [
          {
            title: "Sub Nav 1",
            href: "#",
            icon: LuCircle,
          },
          {
            title: "Sub Nav 2",
            href: "#",
            icon: LuCircle,
          },
          {
            title: "Sub Nav 3",
            href: "#",
            icon: LuCircle,
          },
        ],
      },
      {
        title: "Sub Nav 2",
        href: "#",
        icon: LuCircle,
      },
      {
        title: "Sub Nav 3",
        href: "#",
        icon: LuCircle,
      },
    ],
  },
  {
    title: "Products View",
    href: "/",
    icon: RiComputerLine,
    subNav: [
      {
        title: "ALL in One",
        href: "/product-t1-product-list",
        icon: FaCaretRight,
      },
      {
        title: "Add Product",
        href: "/product-t1-add-form",
        icon: FaCaretRight,
      },
      {
        title: "Update Product",
        href: "/edit-form",
        icon: FaCaretRight,
      },
      {
        title: "List Product",
        href: "/table",
        icon: FaCaretRight,
      },
      {
        title: "Product Details",
        href: "/table",
        icon: FaCaretRight,
      },
    ],
  },
  {
    title: "Order List",
    href: "#",
    icon: FaCaretRight,
    subNav: [
      {
        title: "Order Operations",
        href: "/orders",
        icon: FaCaretRight,
      },
    ],
  },
];
