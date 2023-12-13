"use client";
import { useSelector, useDispatch } from "react-redux";

import { useForm } from "react-hook-form";

import React, { useEffect, useState } from "react";
import {
  selectLoggedInUser,

} from "@/lib/features/Auth/authSlice";
import {
  updateUserAsync,
  selectUserInfo,
} from "@/lib/features/RoleWise/userSlice";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "@/lib/features/Cart/cartSlice";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppDispatch } from "@/lib/redux/store";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "@/lib/features/Order/orderSlice";
import {discountedPrice} from "@/lib/constant/constants";


function Checkout() {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const currentOrder = useSelector(selectCurrentOrder);

  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const totalAmount = items.reduce(
    (amount: number, item: any) => discountedPrice(item.product) * item.quantity + amount,
    0,
  );

  const totalItems = items.reduce(
    (total: number, item: any) => item.quantity + total,
    0,
  );

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const router = useRouter();
  const handleQuantity = (e: any, item: any) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e: any, id: any) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleAddress = (e: any) => {
    console.log(e.target.value);
    // @ts-ignore
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e: any) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    if (currentOrder) {
      router.push(`/OrderSuccess/${currentOrder.id}`);
    }
  }, [currentOrder]);

  const handleOrder = (e: any) => {
    const order: any = {
      items,
      totalAmount,
      totalItems,
      user: user.id,
      paymentMethod,
      selectedAddress,
      status: 'pending',
    };

    dispatch(createOrderAsync(order));
  };
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="default-card px-5 py-12 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(
                  // @ts-ignore
                  updateUserAsync({
                    ...user,
                    // @ts-ignore
                    addresses: [...user.addresses, data],
                  }),
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b dark:border-gray-400/25 border-gray-900/10 pb-12">
                  <h2 className="block leading-6 text-gray-900 dark:text-gray-200 text-2xl font-semibold ">
                    Shipping Address
                  </h2>

                  <p className="border-t mt-4 mb-4 border-gray-800 py-2 dark:border-gray-200 text-sm font-light dark:text-gray-400">
                    Use a permanent address where you can receive the product.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="name"
                          className="default-input"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className="default-input"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          className="default-input"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street"
                          className="default-input"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="default-input"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          autoComplete="address-level1"
                          className="default-input"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          id="pinCode"
                          className="default-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    // onClick={e=>reset()}
                    type="button"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center p-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add Address
                  </button>
                </div>

                <div>
                  <h2 className="block text-base font-semibold text-gray-900 dark:text-gray-200">
                    Addresses
                  </h2>
                  <p className="mt-1 mb-2 text-sm text-gray-500">
                    Choose from Existing addresses
                  </p>
                  <ul >
                    {user &&
                        user.addresses &&
                      user?.addresses.map((address: any, index: any) => (
                        <li
                          key={index}
                          className="mb-4 flex justify-between gap-x-6 px-5 py-5 border-solid border dark:border-gray-200/25 border-gray-900/25 rounded-md"
                        >
                          <div className="flex gap-x-4">
                            <input
                              onChange={handleAddress}
                              name="address"
                              type="radio"
                              value={index}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold dark:text-gray-200 leading-6 text-gray-900">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs dark:text-gray-200 leading-5 text-gray-500">
                                {address.street}
                              </p>
                              <p className="mt-1 truncate text-xs dark:text-gray-200 leading-5 text-gray-500">
                                {address.pinCode}
                              </p>
                            </div>
                          </div>
                          <div className="hidden sm:flex dark:text-gray-200 sm:flex-col sm:items-end">
                            <p className="text-sm dark:text-gray-400 leading-6 text-gray-900">
                              Phone: {address.phone}
                            </p>
                            <p className="text-sm dark:text-gray-200 leading-6 text-gray-500">
                              {address.city}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold block text-gray-900 dark:text-gray-200">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            onChange={handlePayment}
                            value="cash"
                            type="radio"
                            checked={paymentMethod === "cash"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm text-gray-900 dark:text-gray-200"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            onChange={handlePayment}
                            name="payments"
                            checked={paymentMethod === "card"}
                            value="card"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 ">
            <div className="mt-12 sticky top-24">
              <div className="default-card shadow-none max-w-7xl px-2 sm:px-2 lg:px-4">
                <div className="px-0 py-2 sm:px-0">
                  <h3 className="flex text-lg font-bold text-gray-900 dark:text-gray-200 pt-10 pb-0">
                    Order Details
                  </h3>
                  <p className="border-t mt-4 mb-4 border-gray-800 py-2 dark:border-gray-200 text-sm font-light dark:text-gray-400"></p>
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {items.map((item: any) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <Image
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                              height={100}
                              width={100}
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium leading-6 text-gray-900 dark:text-gray-200">
                                <h3>
                                  <a href={item.href}>{item.product.title}</a>
                                </h3>
                                <p className="ml-4">₹{item.product.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.brand}
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

                <div className="mt-2 border-t border-dashed border-gray-900 dark:border-gray-200 px-2 py-6 sm:px-2">
                  <div className="flex justify-between  leading-6 text-gray-900 dark:text-gray-200">
                    <p>Subtotal</p>
                    <p>₹ {totalAmount}</p>
                  </div>
                  <div className="flex justify-between leading-6 text-gray-900 dark:text-gray-200">
                    <p>Total Items in Cart</p>
                    <p>x{totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>

                  <div className="mt-6">
                    <button
                      onClick={handleOrder}
                      className="buyNow w-full flex items-center justify-center rounded-2xl border border-transparent bg-indigo-600 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
