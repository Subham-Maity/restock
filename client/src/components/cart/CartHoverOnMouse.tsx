"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CartItem } from "@/lib/types/Cart/cart.type";
import { AppDispatch } from "@/lib/redux/store";
import {
  selectItems,
  updateCartAsync,
  deleteItemFromCartAsync,
} from "@/lib/features/Cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import { MdDeleteForever } from "react-icons/md";
import { TbShoppingCartUp } from "react-icons/tb";
import { PiLightningFill } from "react-icons/pi";
import {discountedPrice} from "@/lib/constant/constants";

const CartHoverOnMouse = () => {
  const items: CartItem[] = useSelector(selectItems);
  const [isUserClosed, setIsUserClosed] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const totalAmount = items.reduce(
      (amount: number, item: any) => discountedPrice(item.product) * item.quantity + amount,
      0,
  );
  const handleRemove = (e: any, id: any) => {
    if (isUserClosed) return;
    dispatch(deleteItemFromCartAsync(id));
  };
  const handleQuantity = (e: any, item: any) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
  };
  const totalItems = items.reduce(
    (total: number, item: any) => item.quantity + total,
    0,
  );
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="lg:col-span-2 z-50 ">
        <div className="fixed top-3 left-100 right-40 mt-12 rounded-2xl bg-white/80 dark:bg-gray-900 border border-gray-400">
          <div className="max-w-7xl px-2 sm:px-2 lg:px-4">
            <div className="px-0 py-2 sm:px-0">
              <p className="my-2 text-sm font-bold text-gray-900 dark:text-gray-200">
                Your Cart is Empty
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-fit w-fit hidden lg:block">
      <div className="lg:col-span-2 z-50">
        <div className="fixed right-36 mt-12 top-3 bg-gray-300 bg-gradient-to-r dark:from-neutral-800 dark:to-slate-800 left-100 rounded-2xl border border-gray-300 dark:border-gray-600 shadow-lg z-50">
          <div className="w-[26rem] px-2 sm:px-2 lg:px-4  rounded-2xl">
            <div className="px-0 py-2 sm:px-0">
              <h3 className="flex text-lg font-bold text-gray-900 dark:text-gray-200 mt-1 pb-0">
                Your Cart({totalItems})
              </h3>
              <p className="border-t mt-4 mb-4 border-gray-800 py-2 dark:border-gray-200 text-xs font-light dark:text-gray-400"></p>
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-400 h-fit max-h-[24rem] overflow-y-auto pr-3">
                  {items.map((item: any) => (
                    <li key={item.id} className="flex py-3">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={item.product?.thumbnail}
                          alt={item.product?.title}
                          className="h-full w-full object-cover object-center"
                          height={100}
                          width={100}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="text-sm text-left space-y-2 font-medium text-gray-900 dark:text-gray-200">
                            <p>{item.product?.title}</p>
                            <p>₹{item.product?.price}</p>
                            <p className="mt-1 text-xs text-gray-500">
                              {`Brand: ${item.product?.brand}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-xs">
                          <div className="text-gray-500 flex flex-row space-x-2">
                            <label
                              htmlFor="quantity"
                              className="inline text-xs font-medium leading-6 text-gray-900 dark:text-gray-200 my-auto"
                            >
                              Qty
                            </label>
                            <select
                              onChange={(e) => handleQuantity(e, item)}
                              value={item.quantity}
                              className="h-8 w-16 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
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
                              className="md:font-semibold text-xs text-red-600 hover:text-red-500 flex items-center"
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

            <div className="mt-4 border-t-2 border-gray-700 dark:border-gray-200 ">
              <div className="flex justify-between mt-4 leading-6 text-gray-900 dark:text-gray-200">
                <p>Subtotal</p>
                <p>₹ {totalAmount}</p>
              </div>
              <div className="flex justify-between leading-6 text-gray-900 dark:text-gray-200">
                <p>Total Items in Cart</p>
                <p>x{totalItems} items</p>
              </div>
              <div className="mt-6 flex justify-between mb-4">
                <CustomButton
                  title="Go to Cart"
                  className="animated-btn sm:h-10 md:h-10 sm:w-40 md:w-40 text-sm font-bold"
                  animated
                  icon={<TbShoppingCartUp />}
                  onClick={() => {
                    router.push("/cart");
                  }}
                />

                <CustomButton
                  title="Buy Now"
                  className="animated-btn sm:h-10 md:h-10 sm:w-36 md:w-40 text-sm font-bold"
                  animated
                  icon={<PiLightningFill />}
                  onClick={() => {
                    router.push("/checkout");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartHoverOnMouse;
