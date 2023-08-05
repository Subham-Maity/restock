"use client";
import React from "react";
import { Fragment } from "react";

import {
  Bars3Icon,
  BellIcon,
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
import Banner from "@/app/components/Navbar/Banner/Home/Banner";

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
    href: "/parts",
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
    href: "/prebui<t",
    icon: <PiComputerTowerFill />,
    current: false,
  },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <div className="min-h-full">
      <Disclosure
        as="nav"
        className="dark:bg-[#232333] bg-gray-800/30 rounded-full"
      >
        {({ open }) => (
          <>
            <div className="mt-4 mx-auto max-w-8xl px-4 sm:px-6 lg:px-12 py-2 sm:py-2 lg:py-2">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-8">
                    <Image
                      className="h-8 w-8"
                      src="https://img.freepik.com/free-vector/modern-desktop-compute-concept-illustration_114360-12156.jpg"
                      alt="Your Company"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="hidden md:flex items-center space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 dark:bg-gray-500 text-white"
                              : "text-gray-300 dark:hover:bg-gray-700  hover:bg-gray-300",
                            "flex items-center rounded-2xl px-3 py-2 text-sm font-medium",
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
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="rounded-full bg-gray-600 hover:bg-gray-400 p-1 text-white hover:text-black dark:bg-gray-700 dark:hover:text-white dark:hover:bg-gray-600 drop focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                    <span className="inline-flex items-center mb-7 -ml-3 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 opacity-75">
                      3
                    </span>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700",
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium",
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
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
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <span className="inline-flex items-center mb-7 -ml-3 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 opacity-75">
                    3
                  </span>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
