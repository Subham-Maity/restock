import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";

import { AppDispatch } from "@/store/redux/store";
import {
  deleteItemFromCart,
  fetchItemsByUserId,
  selectCartLoaded,
  selectItems,
  updateCart,
} from "@/lib/features/cart/cart-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/redux/useSelector";
import {
  useDeleteItemFromCart,
  useFetchItemsByUserId,
  useUpdateCart,
} from "@/lib/features/cart/cart-react-query";
import { updateCartAsync } from "@/lib/features/cart/cart-async-thunk";
import CustomButton from "@/components/ui/custom-button/custom-button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CartHover = () => {
  const [open, setOpen] = useState(true);
  const [isUserClosed, setIsUserClosed] = useState(false);
  const router = useRouter();
  const items = useAppSelector(selectItems);
  const cartLoaded = useAppSelector(selectCartLoaded);
  const dispatch: AppDispatch = useDispatch();
  const deleteItemFromCartMutation = useDeleteItemFromCart();
  const fetchItemsByUserIdQuery = useFetchItemsByUserId();
  const updateCartMutation = useUpdateCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (fetchItemsByUserIdQuery.isSuccess) {
      dispatch(fetchItemsByUserId(fetchItemsByUserIdQuery.data));
    }
  }, [
    fetchItemsByUserIdQuery.isSuccess,
    fetchItemsByUserIdQuery.data,
    dispatch,
  ]);

  const totalAmount = items.reduce(
    (amount: number, item: any) =>
      item.product.discountPercentage * item.quantity + amount,
    0,
  );

  const totalItems = items.reduce(
    (total: any, item: any) => item.quantity + total,
    0,
  );

  const handleQuantityChange = (e: any, item: any) => {
    updateCartMutation.mutate(
      { id: item.id, quantity: +e.target.value },
      {
        onSuccess: (updatedItem) => {
          dispatch(updateCart(updatedItem));
        },
      },
    );
  };
  const handleRemove = (e: any, id: any) => {
    deleteItemFromCartMutation.mutate(id, {
      onSuccess: () => {
        dispatch(deleteItemFromCart(id));
      },
    });
  };
  const handleQuantity = (e: any, item: any) => {
    dispatch(
      updateCartAsync({ id: item.id, quantity: +e.target.value }),
    ).finally(() => setIsLoading(false));
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
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
            <div className="absolute inset-0 overflow-hidden  mt-20">
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
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md ">
                    <div className="flex h-full backdrop-blur-md flex-col overflow-y-scroll bg-white/80 dark:bg-gray-400/10 rounded-b-xl  mt-16 shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => {
                                setOpen(false);
                                setIsUserClosed(true);
                              }}
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
                            <ul className="-my-6 divide-y divide-gray-200">
                              {items.map((item: any) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={item.product?.thumbnail}
                                      alt={item.product?.title}
                                      className="h-full w-full object-cover object-center"
                                      width={384}
                                      height={384}
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200 ">
                                        <h3>
                                          <a href={item.href}>
                                            {item.product?.title}
                                          </a>
                                        </h3>
                                        <p className="ml-4">
                                          ₹{item.product?.price}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.product?.brand}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="text-gray-500">
                                        <label
                                          htmlFor="quantity"
                                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2"
                                        >
                                          Qty
                                        </label>
                                        <select
                                          onChange={(e) =>
                                            handleQuantity(e, item)
                                          }
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
                                          onClick={(e) =>
                                            handleRemove(e, item.id)
                                          }
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

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">
                            Subtotal
                          </p>
                          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">
                            ₹{totalAmount}/-
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          * Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <div className="mt-6 flex justify-between ">
                            <CustomButton
                              className="relative inline-flex items-center text-lg font-bold justify-center sm:w-40 md:w-48 bg-gray-400/5 dark:bg-gray-500/5 sm:ml-7 p-4 py-3 overflow-hidden text-indigo-500 transition duration-100 ease-out border-2 dark:border-indigo-500/30 rounded-xl shadow-xl group"
                              title="Browse More"
                              type="submit"
                              animated
                              icon={<FaArrowLeft />}
                              onClick={() => {
                                router.push("/");
                              }}
                            />

                            <CustomButton
                              className="relative inline-flex items-center text-lg font-bold justify-center sm:w-40 md:w-48 bg-gray-400/5 dark:bg-gray-500/5 sm:ml-7 p-4 py-3 overflow-hidden text-indigo-500 transition duration-100 ease-out border-2 dark:border-indigo-500/30 rounded-xl shadow-xl group"
                              title="Checkout"
                              type="submit"
                              animated
                              icon={<FaArrowRight />}
                              onClick={() => {
                                router.push("/checkout");
                              }}
                            />
                          </div>
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

export default CartHover;
