"use client";
import { RiMenu2Fill } from "react-icons/ri";

import ThemeSwitcher from "@/theme/theme-switcher";

import { selectItems } from "@/lib/features/cart/cart-slice";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import CartHoverOnMouse from "@/components/cart/cart-hover-on-mouse";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react";

import { selectAllProducts_ } from "@/lib/features/product/product-pc-slice";
import { IoSearchOutline } from "react-icons/io5";
import { selectUserInfo } from "@/lib/features/own/own-details/own-details-slice";
import Search from "@/components/core/search/search";
import { useAppSelector } from "@/store/redux/useSelector";
import MobileSidebar from "@/components/common/home/home-side-nav/mobile-side-nav";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AdminHomeTopNav = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  const itemsForSearch = useAppSelector(selectAllProducts_);
  const [cartHoverTimeout, setCartHoverTimeout] = useState(null);
  const user = useAppSelector(selectUserInfo);
  const items = useAppSelector(selectItems);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [isCartHoverOpen, setIsCartHoverOpen] = useState(false);
  const [isSearchHoverOpen, setIsSearchHoverOpen] = useState(false);

  const userNavigation = [
    { name: "Your Profile Setting", href: "/UserProfile" },
    { name: "My Orders", href: "/orders" },
  ];

  const handleSearchIconHover = () => {
    setIsSearchHoverOpen(true);
    // Clear any previous timeouts
    if (cartHoverTimeout) {
      clearTimeout(cartHoverTimeout);
    }
  };

  const handleSearchIconHoverOut = () => {
    const timeoutId: any = setTimeout(() => {
      setIsSearchHoverOpen(false);
    }, 500);

    // Store the timeout ID in state for future reference
    setCartHoverTimeout(timeoutId);
  };

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  const handleCartIconHover = () => {
    setIsCartHoverOpen(true);
    // Clear any previous timeouts
    if (cartHoverTimeout) {
      clearTimeout(cartHoverTimeout);
    }
  };
  const handleCartIconHoverOut = () => {
    const timeoutId: any = setTimeout(() => {
      setIsCartHoverOpen(false);
    }, 500);

    // Store the timeout ID in state for future reference
    setCartHoverTimeout(timeoutId);
  };
  return (
    <div className="">
      <div className="flex h-12 items-center justify-between ">
        <div className=" flex items-center space-x-4 gap-0 lg:gap-0">
          <div className="flex mt-2  items-start">
            {openMobileNav && (
              <MobileSidebar
                onClose={(value) => setOpenMobileNav(value)}
                isSidebarOpen={openMobileNav}
              />
            )}
            <RiMenu2Fill
              size={25}
              className="hover:cursor-pointer text-white lg:hidden"
              onClick={() => {
                setOpenMobileNav(true);
              }}
            />
          </div>
          <h1 className="dark:text-white text-left text-black ml-2 font-bold whitespace-nowrap text-2xl hidden sm:block">
            Restock
          </h1>
        </div>
        <div className="flex justify-center">
          {/*<AdminNavbarSearch items={itemsForSearch}/>*/}
          <div>
            <button
              type="button"
              onMouseEnter={handleSearchIconHover}
              onMouseLeave={handleSearchIconHoverOut}
              className=" rounded-lg w-36 bg-gray-500 hover:bg-gray-600 p-1.5 text-white dark:bg-gray-700
                      dark:hover:text-white dark:hover:bg-gray-600 drop  hover:cursor-pointer cursor-pointer border border-gray-600/25 shadow shadow-gray-500/25"
            >
              <div className="flex">
                <IoSearchOutline className="h-5 w-5 " aria-hidden="true" />
                <p className="mt-0 ml-1 text-gray-200/25 font-light">Search</p>
              </div>
              {isSearchHoverOpen && (
                <div className="fixed right-36 mt-12 top-8 z-50">
                  <div className="bg-white/50 dark:bg-[#1a1a1a]/70 rounded-b-xl lg:mx-16 max-w-8xl px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2 ">
                    <Search items={itemsForSearch} />
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className=" ml-auto">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                onMouseEnter={handleCartIconHover}
                onMouseLeave={handleCartIconHoverOut}
                className="rounded-xl bg-gray-500 hover:bg-gray-600 p-1.5 text-white dark:bg-gray-700
                      dark:hover:text-white dark:hover:bg-gray-600 drop focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:cursor-pointer cursor-pointer"
              >
                <Link href={"/cart"}>
                  <ShoppingCartIcon className="h-6 w-6" />
                </Link>
                {isCartHoverOpen && <CartHoverOnMouse />}
              </button>
              {items.length > 0 && (
                <span className="inline-flex items-center mb-7 -ml-3 rounded-full font-bold bg-green-600 px-2 py-1 text-xs text-white ring-1 ring-inset">
                  {items.length}
                </span>
              )}

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm ">
                    <span className="sr-only xl:hidden">Open user menu</span>

                    <div className="flex-shrink-0">
                      {user &&
                      user.addresses &&
                      user.addresses[0] &&
                      user.addresses[0].dpUrl ? (
                        <Image
                          className="h-10 w-10 p-0.5 rounded-full bg-gray-500 dark:bg-gray-500 flex items-center justify-center text-white dark:hover:bg-gray-300 drop  text-lg"
                          src={user.addresses[0].dpUrl}
                          alt=""
                          width={40}
                          height={40}
                        />
                      ) : user && user.email ? (
                        <div
                          className="h-9 w-9 rounded-full bg-gray-500 dark:bg-gray-700 flex items-center justify-center text-white dark:hover:bg-gray-600 drop  text-lg"
                          style={{ fontSize: "1.5rem" }}
                        >
                          <p className="mt-1">{user.email[0].toUpperCase()}</p>
                        </div>
                      ) : (
                        <Image
                          className="h-10 w-10 p-2 rounded-full bg-gray-500 dark:bg-gray-700 flex items-center justify-center text-white dark:hover:bg-gray-600 drop  text-lg"
                          src="/HomeTopNav/blankUser.svg"
                          alt=""
                          width={40}
                          height={40}
                        />
                      )}
                    </div>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0  mt-8 w-48 origin-top-right bg-slate-200 dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-2xl">
                    <div>
                      <div className="text-sm ml-4 mb-2 mt-4 font-medium leading-none text-gray-800 dark:text-gray-300">
                        {user?.addresses && user.addresses[0]
                          ? user.addresses[0].name
                          : "No Name Provided"}
                      </div>
                      <div className="text-sm ml-4 mb-2 mt-4 font-bold leading-none text-gray-950 dark:text-gray-300 ">
                        {user?.email && user.email
                          ? user.email
                          : "No Email Provided"}
                      </div>
                    </div>
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link
                            href={item.href}
                            className={classNames(
                              active
                                ? " bg-gray-400 dark:bg-gray-500 text-gray-950"
                                : "",
                              "font-medium block px-4 py-2 text-sm text-gray-950 dark:text-gray-300 rounded-2xl",
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                    <div>
                      {user ? (
                        <Link
                          href="/logout"
                          className="block px-4 py-2 text-sm font-bold text-gray-900 dark:text-gray-200 rounded-2xl hover:bg-red-600/90 bg-red-500/90"
                        >
                          Logout
                        </Link>
                      ) : (
                        <Link
                          href="/login"
                          className="block px-4 py-2 text-sm font-bold text-gray-900 dark:hover:text-gray-700 dark:text-gray-200 rounded-2xl hover:bg-green-400"
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeTopNav;
