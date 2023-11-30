"use client";
import React from "react";
import { Fragment } from "react";

import {  Menu, Transition } from "@headlessui/react";
import { BiSolidOffer, BiSolidMouseAlt } from "react-icons/bi";
import { PiComputerTowerFill } from "react-icons/pi";
import { TbBrandSupabase } from "react-icons/tb";
import { BsGpuCard } from "react-icons/bs";

import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import "@/app/globals.css";

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

function ProductListSkeleton() {
  let placeholder = () => {
    let temp = [];
    for (let i = 0; i < 15; i++) {
      // @ts-ignore
      temp.push(
        <div id={"" + i} className=" rounded-lg ">
          <div className=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
            <div className="w-full h-full">
              <div className="stretch h-full w-full"></div>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <div className="text-gray-800 dark:text-gray-300">
                  <span aria-hidden="true" className="absolute inset-0 "></span>
                  <div className="w-36 lg:w-36 xl:w-48 2xl:w-64 h-10 rounded-l stretch"></div>
                </div>
              </h3>
            </div>
          </div>
        </div>,
      );
    }
    return (
      <div className="grid grid-cols-2 lg:p-8 gap-x-2 gap-y-10 mt-5 lg:mt-0 m-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-x-2">
        {temp}
      </div>
    );
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 rounded-b-lg z-50 backdrop-blur-3xl">
        <nav
          className="bg-white/50 dark:bg-black/70 rounded-b-xl"
          data-headlessui-state=""
        >
          <div className="lg:mx-16 max-w-8xl px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2">
            <div className="flex h-16 items-center justify-between lg:justify-start">
              <div className="flex items-center">
                <div className="flex space-x-2 mr-8"></div>
                <div className="hidden xl:block">
                  <div className="flex items-center space-x-4">
                    <div
                      className="stretch w-36 h-10 md:rounded-lg   text-white flex items-center rounded-lg px-3 py-2 text-sm font-medium"
                      aria-current="page"
                    >
                      <div className=" flex space-x-1  mr-2 "></div>
                    </div>
                    <div className="tflex items-center rounded-lg px-3 py-2 text-sm font-medium">
                      <div
                        className="stretch w-32 h-10 md:rounded-lg   text-white flex items-center rounded-lg px-3 py-2 text-sm font-medium"
                        aria-current="page"
                      >
                        <div className=" flex space-x-1  mr-2 "></div>
                      </div>
                    </div>
                    <div className="flex items-center rounded-lg px-3 py-2 text-sm font-medium">
                      <div className="dark:text-white flex space-x-1 text-black mr-2">
                        <div
                          className="stretch w-32 h-10 md:rounded-lg   text-white flex items-center rounded-lg px-3 py-2 text-sm font-medium"
                          aria-current="page"
                        >
                          <div className=" flex space-x-1  mr-2 "></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center rounded-lg px-3 py-2 text-sm font-medium">
                      <div className="dark:text-white flex space-x-1 text-black mr-2">
                        <div
                          className="stretch w-32 h-10 md:rounded-lg   text-white flex items-center rounded-lg px-3 py-2 text-sm font-medium"
                          aria-current="page"
                        >
                          <div className=" flex space-x-1  mr-2 "></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center rounded-lg px-3 py-2 text-sm font-medium">
                      <div className="dark:text-white flex space-x-1 text-black mr-2">
                        <div
                          className="stretch w-32 h-10 md:rounded-lg   text-white flex items-center rounded-lg px-3 py-2 text-sm font-medium"
                          aria-current="page"
                        >
                          <div className=" flex space-x-1  mr-2 "></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden xl:block ml-auto">
                <div className="ml-4 flex items-center md:ml-6">
                  <div
                    className="stretch w-10 h-10 md:rounded-lg text-white flex items-center rounded-lg px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    <div className=" flex space-x-1  mr-2 "></div>
                  </div>
                  <div className="relative ml-3" data-headlessui-state="">
                    <div>
                      <div
                        className="stretch w-10 h-10 md:rounded-lg text-white flex items-center rounded-lg px-3 py-2 text-sm font-medium"
                        aria-current="page"
                      >
                        <div className=" flex space-x-1  mr-2 "></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      className="ml-3 stretch w-10 h-10 md:rounded-lg text-white flex items-center rounded-lg px-3 py-2 text-sm font-medium"
                      aria-current="page"
                    >
                      <div className=" flex space-x-1  mr-2 "></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex xl:hidden ">
                <button
                  className="inline-flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="headlessui-disclosure-button-:r2:"
                  type="button"
                  aria-expanded="false"
                  data-headlessui-state=""
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="block h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/*Carousel*/}
      <div className="stretch rounded-b-2xl h-[230px] sm:h-[260px] md:h-[380px] lg:h-fit xl:h-fit 2xl:h-fit"></div>
      {/*Body*/}
      <main className=" lg:mx-16 max-w-8xl lg:px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-6 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            New Arrivals
          </h1>

          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-white">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md dark:bg-[#25293c] shadow-xl dark:shadow-[#292045] shadow-[#f3f4f6] ring-1 ring-black bg-white ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        <p
                          className={
                            "cursor-pointer dark:hover:bg-[#343756] hover:bg-[#f3f4f6] text-gray-800 dark:text-[#d9d8ff] dark:bg-[#25293c ] dark:hover:text-[#7f70ff] "
                          }
                        ></p>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full">
          <section
            aria-labelledby="products-heading"
            className="hidden lg:block pb-12 pt-6"
          >
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className="flex flex-col gap-2">
              <div className="stretch h-6 w-48 rounded-2xl"></div>
              <div className="stretch h-6 w-48 rounded-2xl"></div>
            </div>
          </section>
          {placeholder()}
        </div>
      </main>

      {/*product*/}
    </>
  );
}

export default ProductListSkeleton;
