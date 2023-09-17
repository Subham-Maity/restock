"use client";
import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "@/app/components/cart/cartSlice";
import { CartItem } from "@/app/components/cart/cart.type";
import { AppDispatch } from "@/lib/redux/store";

export default function Cart() {
  const items: CartItem[] = useSelector(selectItems);

  const dispatch: AppDispatch = useDispatch();
  const totalAmount = items.reduce(
    (amount: any, item: any) => item.price * item.quantity + amount,
    0,
  );

  const totalItems = items.reduce(
    (total: any, item: any) => item.quantity + total,
    0,
  );

  const handleQuantityChange = (e: any, item: any) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };
  const handleRemove = (e: any, id: any) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  console.log(items + "items");
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Your Cart is Empty</h1>
        <Link
          href="/"
          className="mt-4 relative inline-flex items-center text-lg font-bold justify-center sm:w-40 md:w-48 bg-gray-400/5 dark:bg-gray-500/5 sm:ml-7 p-4 py-3 overflow-hidden text-indigo-500 transition duration-100 ease-out border-2 dark:border-indigo-500/30 rounded-xl shadow-xl group"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-2xl duration-100 -translate-x-full bg-indigo-600 dark:bg-indigo-500 group-hover:translate-x-0 ease">
            <FaArrowLeft />
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-indigo-500 dark:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-full ease">
            Go Back
          </span>
          <span className="relative invisible">Button Text</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="py-4 ml-24 max-w-7xl px-4 sm:px-6 lg:px-8 my-6 default-card">
            <h1 className="text-3xl my-5 font-bold tracking-tight text-gray-800 dark:text-gray-200">
              Shopping Cart ({totalItems})
            </h1>
            <div className="border-t border-gray-800 dark:border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul
                  role="list"
                  className="-my-6 divide-y divide-gray-800 dark:divide-gray-200"
                >
                  {items.map((item: any) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border ">
                        <Image
                          src={item.thumbnail}
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
                              <a href={item.href}>{item.title}</a>
                            </h3>
                            <p className="ml-4">₹{item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                            >
                              Qty
                            </label>
                            <select
                              onChange={(e) => handleQuantityChange(e, item)}
                              value={item.quantity}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>

                          <div className="flex item-center flex-row">
                            <button
                              type="button"
                              className="md:font-semibold text-sm md:text-base text-red-600 hover:text-red-500 flex items-center"
                              onClick={(e) => handleRemove(e, item.id)}
                            >
                              <MdDeleteForever />
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
        </div>
        <div className="lg:col-span-2">
          <div className="py-2 mr-32 max-w-7xl sm:px-6 my-6 default-card">
            <h1 className="text-2xl my-5 font-bold tracking-tight text-gray-800 dark:text-gray-200">
              Order Summary
            </h1>

            <div className=" dark:border-gray-200 ">
              <div className="border-t border-gray-800 dark:border-gray-200 py-6 ">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900 dark:text-gray-200">
                  <p>Subtotal</p>
                  <p>₹{totalAmount}/-</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900 dark:text-gray-200">
                  <p>Total Products in Your Cart</p>
                  <p>{totalItems}</p>
                </div>

                <p className="mt-0.5 text-sm text-gray-500">
                  * Shipping and taxes calculated at checkout.
                </p>
              </div>
              <div>
                <div className="mt-6 flex justify-between ">
                  <Link
                    href="/"
                    className="relative inline-flex items-center text-lg font-bold justify-center sm:w-40 md:w-48 bg-gray-400/5 dark:bg-zinc-500/5 sm:ml-7 p-4 py-3 overflow-hidden text-indigo-500 transition duration-100 ease-out border-2 dark:border-indigo-500/30 rounded-xl shadow-xl group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-2xl duration-100 -translate-x-full bg-indigo-600 dark:bg-indigo-500 group-hover:translate-x-0 ease">
                      <FaArrowLeft />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-indigo-500 dark:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-full ease">
                      Browse More
                    </span>
                    <span className="relative invisible">Button Text</span>
                  </Link>

                  <Link
                    href=""
                    className="relative inline-flex items-center text-lg font-bold justify-center sm:w-40 md:w-48 bg-gray-400/5 dark:bg-gray-500/5 sm:ml-7 p-4 py-3 overflow-hidden text-indigo-500 transition duration-100 ease-out border-2 dark:border-indigo-500/30 rounded-xl shadow-xl group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-2xl duration-100 -translate-x-full bg-indigo-600 dark:bg-indigo-500 group-hover:translate-x-0 ease">
                      <FaArrowRight />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-indigo-500 dark:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-full ease">
                      Place Order
                    </span>
                    <span className="relative invisible">Button Text</span>
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
