"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { CartItem } from "@/app/components/cart/cart.type";
import { AppDispatch } from "@/lib/redux/store";
import {
  selectItems,
  updateCartAsync,
  deleteItemFromCartAsync,
} from "@/app/components/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { router } from "next/client";
import { useRouter } from "next/navigation";

const CartHoverOnMouse = () => {
  const items: CartItem[] = useSelector(selectItems);
  const [isUserClosed, setIsUserClosed] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const totalAmount = items.reduce(
    (amount: any, item: any) => item.price * item.quantity + amount,
    0,
  );
  const handleRemove = (e: any, id: any) => {
    if (isUserClosed) return;
    dispatch(deleteItemFromCartAsync(id));
  };
  const handleQuantity = (e: any, item: any) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };
  const totalItems = items.reduce(
    (total: number, item: any) => item.quantity + total,
    0,
  );
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="lg:col-span-2 z-50 ">
        <div className="fixed top-2 left-100 right-40 mt-12 rounded-2xl bg-gray-400 dark:bg-gray-500 border border-gray-400">
          <div className="default-card shadow-none max-w-7xl px-2 sm:px-2 lg:px-4">
            <div className="px-0 py-2 sm:px-0">
              <p className="mt-4 mb-4">Cart is empty</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" h-fit w-full">
      <div className="lg:col-span-2 z-50 ">
        <div className="fixed top-2 bg-gray-400 dark:bg-stone-800 left-100 right-40 mt-12 rounded-2xl border border-gray-400">
          <div className="default-card shadow-none max-w-7xl px-2 sm:px-2 lg:px-4">
            <div className="px-0 py-2 sm:px-0">
              <h3 className="flex text-lg font-bold text-gray-900 dark:text-gray-200 mt-1 pb-0">
                Your Cart({totalItems})
              </h3>
              <p className="border-t mt-4 mb-4 border-gray-800 py-2 dark:border-gray-200 text-sm font-light dark:text-gray-400"></p>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {items.map((item: any) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                          height={100}
                          width={100}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium leading-6 text-gray-900 dark:text-gray-200">
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
                          <div className="text-gray-500 flex flex-row space-x-2">
                            <label
                              htmlFor="quantity"
                              className="inline text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 my-auto"
                            >
                              Qty
                            </label>
                            <select
                              onChange={(e) => handleQuantity(e, item)}
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
                              className="md:font-semibold text-sm text-red-600 hover:text-red-500 flex items-center"
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

            <div className="mt-2 border-t border-dashed border-gray-900 dark:border-gray-200 ">
              <div className="flex justify-between mt-4 leading-6 text-gray-900 dark:text-gray-200">
                <p>Subtotal</p>
                <p>₹ {totalAmount}</p>
              </div>
              <div className="flex justify-between leading-6 text-gray-900 dark:text-gray-200">
                <p>Total Items in Cart</p>
                <p>x{totalItems} items</p>
              </div>
              <div className="mt-6 flex justify-between ">
                <button
                  onClick={() => {
                    router.push("/cart");
                  }}
                  className="relative mb-4 inline-flex items-center text-sm font-bold justify-center sm:h-10 md:h-10 sm:w-20 md:w-28 bg-gray-400/5 dark:bg-zinc-500/5 overflow-hidden text-indigo-500 transition duration-100 ease-out border-2 dark:border-indigo-500/30 rounded-xl shadow-xl group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-lg duration-100 -translate-x-full bg-indigo-600 dark:bg-indigo-500 group-hover:translate-x-0 ease">
                    <FaArrowLeft />
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-indigo-500 dark:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-full ease">
                    Cart
                  </span>
                  <span className="relative invisible">Button Text</span>
                </button>

                <button
                  onClick={() => {
                    router.push("/checkout");
                  }}
                  className="relative mb-4 inline-flex items-center text-sm font-bold justify-center sm:h-10 md:h-10 sm:w-20 md:w-28 bg-gray-400/5 dark:bg-zinc-500/5 overflow-hidden text-indigo-500 transition duration-100 ease-out border-2 dark:border-indigo-500/30 rounded-xl shadow-xl group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-lg duration-100 -translate-x-full bg-indigo-600 dark:bg-indigo-500 group-hover:translate-x-0 ease">
                    <FaArrowRight />
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-indigo-500 dark:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-full ease">
                    Buy Now
                  </span>
                  <span className="relative invisible">Button Text</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartHoverOnMouse;
