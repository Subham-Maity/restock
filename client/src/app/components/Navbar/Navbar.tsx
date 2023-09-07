"use client";
import React from "react";
import { Fragment } from "react";

import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BiSolidOffer, BiSolidMouseAlt } from "react-icons/bi";
import { PiComputerTowerFill } from "react-icons/pi";
import { TbBrandSupabase } from "react-icons/tb";
import { BsGpuCard } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import Switcher from "../Mode/Switcher";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  {
    id: 1,
    name: "Deals of The Day",
    href: "/dod",
    icon: <BiSolidOffer />,
    current: true,
  },
  {
    id: 2,
    name: "Brand Store",
    href: "/brand",
    icon: <TbBrandSupabase />,
    current: false,
  },
  {
    id: 3,
    name: "PC Components",
    href: "/pc-components",
    icon: <BsGpuCard />,
    current: false,
  },
  {
    id: 4,
    name: "PC Peripherals",
    href: "/peripherals",
    icon: <BiSolidMouseAlt />,
    current: false,
  },
  {
    id: 5,
    name: "Pre-Built PCs",
    href: "/prebuilt",
    icon: <PiComputerTowerFill />,
    current: false,
  },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "/login" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 rounded-b-lg z-50 backdrop-blur-3xl">
      <Disclosure
        as="nav"
        className="bg-white/70 dark:bg-black/70 rounded-b-xl"
      >
        {({ open }) => (
          <>
            <div className="lg:mx-16 max-w-8xl px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2">
              <div className="flex h-16 items-center justify-between lg:justify-start">
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-8">
                    <Link href="/">
                      <Image
                        className="h-8 w-8"
                        src="https://img.freepik.com/free-vector/modern-desktop-compute-concept-illustration_114360-12156.jpg"
                        alt="Your Company"
                        width={32}
                        height={32}
                      />
                    </Link>
                  </div>
                  <div className="hidden xl:block">
                    <div className="flex items-center space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 bg-opacity-90 md:rounded-lg dark:bg-gray-500 dark:bg-opaity-70 text-white"
                              : "text-gray-300 dark:hover:bg-gray-600 dark:bg-opacity-95 hover:bg-gray-300 hover:bg-opacity-95",
                            "flex items-center rounded-lg px-3 py-2 text-sm font-medium",
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <div className="dark:text-white flex space-x-1 text-black mr-2">
                            <span className="my-auto">{item.icon}</span>
                            <span>{item.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block ml-auto">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="rounded-full bg-gray-500 hover:bg-gray-600 p-1 text-white dark:bg-gray-700
                      dark:hover:text-white dark:hover:bg-gray-600 drop focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <Link href={"/cart"}>
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Link>
                    </button>
                    <span className="inline-flex items-center mb-7 -ml-3 rounded-xl font-bold bg-green-100 px-2 py-1 text-xs text-green-600 ring-1 ring-inset ring-red-600/10 opacity-75">
                      3
                    </span>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only xl:hidden">
                            Open user menu
                          </span>
                          <Image
                            className="h-8 w-8 rounded-full hidden xl:block"
                            src={user.imageUrl}
                            alt=""
                            width={32}
                            height={32}
                          />
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
                        <Menu.Items className="absolute right-0 z-10 mt-8 w-48 origin-top-right bg-slate-200 dark:bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-2xl">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    active
                                      ? "bg-gray-400 dark:bg-gray-500"
                                      : "",
                                    "block px-4 py-2 text-sm dark:text-gray-200 rounded-2xl",
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                          <div className="ml-4">
                            <Switcher />
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="flex xl:hidden ">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/*Mobile View*/}
            <Disclosure.Panel className="xl:hidden rounded-b-2xl">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-200 bg-opacity-80  dark:bg-gray-400 dark:bg-opacity- text-black "
                        : "text-gray-100 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-400 ",
                      "block rounded-3xl px-3 py-2 text-base font-medium",
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>

              <div className="border-t border-gray-700 pb-3 pt-4 ">
                <div className="flex items-center px-5 ">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-500 hover:bg-gray-600 p-1 text-white dark:bg-gray-700 dark:hover:text-white dark:hover:bg-gray-600 drop focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 lg:hidden"
                  >
                    <span className="sr-only">View notifications</span>
                    <Link href={"/cart"}>
                      <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                  </button>
                  <span className="inline-flex items-center mb-7 -ml-3 rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/10 opacity-75 lg:hidden">
                    3
                  </span>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-200 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
              <Switcher />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
