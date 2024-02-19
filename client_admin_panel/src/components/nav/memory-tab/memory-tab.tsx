import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { navConfig } from "@/config/sidenav/side-nav-setting";
import React from "react";
import { NavItem } from "@/components/nav/sidenav/config/sidenav-interface";
import { TERipple } from "tw-elements-react";

type Tab = {
  path: string;
  title: string;
  Icon: React.ElementType;
};

const MAX_TABS = 5;

export default function MemoryTab() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let matchedNavItem: NavItem | undefined;
    for (const item of navConfig) {
      if (item.href === pathname) {
        matchedNavItem = item;
        break;
      } else if (item.subNav) {
        const subNavItem = item.subNav.find(
          (subItem) => subItem.href === pathname,
        );
        if (subNavItem) {
          matchedNavItem = subNavItem;
          break;
        }
      }
    }

    if (matchedNavItem) {
      setTabs((prevTabs) => {
        // Check if tab already exists in the state
        if (prevTabs.find((tab) => tab.title === matchedNavItem!.title)) {
          return prevTabs;
        }

        let newTabs = [...prevTabs];
        if (newTabs.length >= MAX_TABS) {
          newTabs.shift();
        }
        return [
          ...newTabs,
          {
            path: pathname,
            title: matchedNavItem!.title,
            Icon: matchedNavItem!.icon,
          },
        ];
      });
    }
  }, [pathname]);

  const closeTab = (
    path: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setTabs(tabs.filter((tab) => tab.path !== path));
  };

  const navigateToTab = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex space-x-2">
      {tabs.map((tab) => (
        <TERipple rippleColor="light" rippleDuration={1000} key={tab.path}>
          <div
            className={`flex items-center mt-0.5 ml-2 space-x-2 rounded px-2 ${
              tab.path === pathname
                ? " bg-[#d3d3d3] dark:bg-gray-800 dark:hover:bg-[#3d3d3d] hover:bg-[#d3d3d3] "
                : "dark:bg-[#312f2d] bg-gray-200 dark:hover:bg-[#3d3d3d] hover:bg-[#a9aaac]"
            }`}
            key={tab.path}
          >
            <tab.Icon className="mr-2" />

            <button
              onClick={() => navigateToTab(tab.path)}
              className=" dark:text-gray-400 text-gray-600 dark:hover:text-gray-100 hover:text-gray-100"
            >
              {tab.title}
            </button>

            <FaTimes
              className="dark:text-gray-400 text-gray-300 dark:hover:text-gray-100 hover:text-gray-100"
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
              ) => closeTab(tab.path, event)}
            />
          </div>
        </TERipple>
      ))}
    </div>
  );
}
