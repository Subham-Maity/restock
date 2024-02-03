"use client";
import React, { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import { FunnelIcon } from "@heroicons/react/20/solid";

import "@/styles/globals.css";

function ProductListSkeleton() {
  let placeholder = () => {
    let temp = [];
    for (let i = 0; i < 15; i++) {
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
                  <div className="w-36 lg:w-36 xl:w-48 2xl:w-64 "></div>
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
          <div className="lmax-w-7xl">
            <div className="flex h-16 items-center justify-between lg:justify-start">
              <div className="flex items-center">
                <div className="flex space-x-2 mr-8"></div>
                <div className="hidden xl:block">
                  <div className="flex items-center space-x-4">
                    <div
                      className="text-white flex items-center rounded-lg px-3 py-2 text-sm font-medium"
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
                        ></div>
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
      <main className="  max-w-8xl">
        <div className="justify-between ">
          <Menu as="div" className="relative inline-block text-left">
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            ></Transition>
          </Menu>

          <button
            type="button"
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
          >
            <span className="sr-only">Filters</span>
            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex w-full">
          <section
            aria-labelledby="products-heading"
            className="hidden lg:block "
          >
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
          </section>
          {placeholder()}
        </div>
      </main>

      {/*product*/}
    </>
  );
}

export default ProductListSkeleton;
