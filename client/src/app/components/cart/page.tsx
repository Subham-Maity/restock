"use client";
import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Image1",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://images.unsplash.com/photo-1690207714547-6e76b0e61b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Image2",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://images.unsplash.com/photo-1690395782424-81ae275080aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
];

export default function Cart() {
  const router = useRouter();
  return (
    <>
      {/* <CartHover /> */}
      <div>
        <div className="py-4 mx-3 lg:mx-16 xl:mx-24 max-w-8xl px-4 sm:px-6 lg:px-8 my-6 default-card">
          <div className="border-t border-gray-800 dark:border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-800 dark:text-gray-200">
              Your Cart
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-800 dark:divide-gray-200">
                {products.map((item: any) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border ">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                        width={384}
                        height={384}
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                          <h3>
                            <Link href={item.href}>{item.title}</Link>
                          </h3>
                          <p className="ml-4">{item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                        <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                            
                            Qty
                          </label>
                          <select value={item.quantity}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-orange-600 hover:text-orange-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900 dark:text-gray-200">
              <p>Subtotal</p>
              <p>₹555255*</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900 dark:text-gray-200">
              <p>Total Items in Cart</p>
              <p>54 items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              * Shipping and taxes calculated at checkout.
            </p>
            </div>
            <div>
            <div className="mt-6 flex justify-center space-x-10">
              <Link href=""
              className="py-3 px-4 flex w-auto justify-center rounded-3xl bg-orange-600 active:bg-slate-600 text-base font-semibold leading-6 text-white shadow-sm hover:bg-orange-400">
                <div className="flex items-center"
                onClick={() => router.back()}>
                <HiArrowLeft/>
                Back to Browsing
                </div>
              </Link>
              <Link
                href="/checkout"
                className="py-3 px-4 flex w-auto justify-center rounded-3xl bg-orange-600 active:bg-slate-600 text-base font-semibold leading-6 text-white shadow-sm hover:bg-orange-400"
              >
                <div className="flex items-center">
                
                Continue Checkout
                <HiArrowRight/>
                </div>
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CartHover = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close Panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {products.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={product.imageSrc}
                                      alt={product.imageAlt}
                                      className="h-full w-full object-cover object-center"
                                      width={200}
                                      height={200}
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {product.quantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>$262.00</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <Link href="/">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => setOpen(false)}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
