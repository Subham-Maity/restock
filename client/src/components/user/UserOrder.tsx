"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch } from "@/lib/redux/store";
import Image from "next/image";
import { selectLoggedInUser } from "@/lib/features/Auth/authSlice";
import {
  fetchLoggedInUserOrderAsync,
  selectUserOrders,
} from "@/lib/features/RoleWise/userSlice";

export default function UserOrders() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);

  console.log(orders?.selectedAddress , "orders")

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, [dispatch, user]);
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">You are not logged in</h1>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">You have no orders</h1>
      </div>
    );
  }

  return (
    <div>
      {orders.map((order: any) => (
        <div key={order.id}>
          <div>
            <div className="mx-auto border-b default-card pb-12 mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-6">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900 dark:text-gray-200">
                  Order # {order.id}
                </h1>
                <h3 className="text-xl my-5 font-bold tracking-tight dark:text-red-500 text-red-900">
                  Order Status : {order.status}
                </h3>
                <div className="flow-root">
                  <ul
                    className="-my-6 dark:text-gray-200 divide-y divide-gray-200"
                  >
                    {order.items.map((item: any) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border ">
                          <Image
                            width={150}
                            height={150}
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-gray-900 dark:text-gray-200 text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.product.href}>{item.product.title}</a>
                              </h3>
                              <p className="ml-4">₹{item.product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className=" text-gray-900 dark:text-gray-200">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-gray-900 dark:text-gray-200 text-sm font-medium leading-6 "
                              >
                                Qty :{item.quantity}
                              </label>
                            </div>

                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t dark:border-gray-200 border-gray-800  px-4 py-6 sm:px-6">
                <div className="flex text-gray-900 dark:text-gray-200 justify-between my-2 text-base font-medium ">
                  <p>Subtotal</p>
                  <p>₹ {order?.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium  text-gray-900 dark:text-gray-200">
                  <p>Total Items in Cart</p>
                  <p>{order?.totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm mb-4 text-gray-700 dark:text-gray-400">
                  Shipping Address :
                </p>
                <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 dark:border-gray-200/20 border-gray-800/20">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      {order.selectedAddress?.name && (
                        <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                          {order.selectedAddress?.name}
                        </p>
                      )}
                      {order.selectedAddress?.street && (
                        <p className="mt-1 truncate text-xs leading-5 text-gray-900 dark:text-gray-200">
                          {order.selectedAddress?.street}
                        </p>
                      )}
                      {order.selectedAddress?.pinCode && (
                        <p className="mt-1 truncate text-xs leading-5 text-gray-900 dark:text-gray-200">
                          {order.selectedAddress?.pinCode}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    {order.selectedAddress?.phone && (
                      <p className="text-sm leading-6 text-gray-900 dark:text-gray-200">
                        Phone: {order.selectedAddress?.phone}
                      </p>
                    )}
                    {order.selectedAddress?.city && (
                      <p className="text-sm leading-6 text-gray-900 dark:text-gray-200">
                        {order.selectedAddress?.city}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
