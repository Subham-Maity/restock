"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { AppDispatch } from "@/lib/redux/store";
import {
  selectUserInfo,
  updateUserAsync,
} from "@/lib/features/RoleWise/userSlice";
import { MdDeleteForever } from "react-icons/md";
import {
  AiFillCloseSquare,
  AiOutlineEdit,
  AiOutlineHome,
  AiOutlineMail,
} from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { FaUserCheck, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";

type Inputs = {
  email: string;
  password: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  dpUrl: string;
};
export default function UserProfile() {
  const dispatch: AppDispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const handleEdit = (addressUpdate: any, index: any) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };
  const handleRemove = (e: any, index: any) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index: any) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("dpUrl", address.dpUrl);
  };

  const handleAdd = (address: any) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  return (
    <div>
      <div className="mx-auto mt-12 default-card max-w-7xl default-card pb-12 ">
        <div className="px-4 py-6 sm:px-6">
          <h1 className="text-4xl flex my-5 font-bold tracking-tight text-yellow-900 dark:text-yellow-200">
            <FaUserShield className="mt-0.5 mr-1.5" /> Name:{" "}
            <span className="ml-2 text-pink-900 dark:text-pink-200 break-all">
              {userInfo.addresses && userInfo.addresses[0]
                ? userInfo.addresses[0].name
                : "No Name Provided"}
            </span>
          </h1>
          <hr className="border-t dark:border-gray-600 border-gray-600 py-2 mr-96" />
          <h3 className="text-xl flex font-bold tracking-tight dark:text-indigo-500 text-indigo-900 ">
            <AiOutlineMail className="mt-1 mr-1.5" />
            Email Address :{" "}
            <span className="ml-2 text-blue-900 dark:text-blue-400 break-all">
              {" "}
              {userInfo?.email && userInfo.email}
            </span>
          </h3>
          <hr className="border-t dark:border-gray-600 mt-4 border-gray-600  mr-96 " />
        </div>

        {userInfo.role === "admin" && (
          <h3 className="text-xl flex ml-6 mb-4 font-bold tracking-tight dark:text-green-500 text-gren-900">
            <FaUserCheck className="mt-1 mr-1.5" /> role :
            <span className="ml-2 text-emerald-900 dark:text-emerald-200 break-all">
              {" "}
              {userInfo.role}{" "}
            </span>
          </h3>
        )}

        <div className="border-t dark:border-gray-200 border-gray-600 px-4 py-6 sm:px-6">
          <motion.button
            onClick={(e) => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            type="submit"
            className="inline-flex rounded-md my-5 text-gray-200 bg-green-600 px-3 py-2 text-md dark:text-gray-200 font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiPlus className="mt-0.5 mr-1 text-md" />
            Add New Address
          </motion.button>
          {showAddAddressForm ? (
            <form
              className="default-card px-5 py-12 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                handleAdd(data);
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 text-gray-900 dark:text-gray-200 pb-12">
                  <h2 className="text-2xl font-semibold leading-7  text-gray-900 dark:text-gray-200">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 text-gray-900 dark:text-gray-200 sm:grid-cols-6">
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
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 "
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
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
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
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
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
                        {errors.street && (
                          <p className="text-red-500">
                            {errors.street.message}
                          </p>
                        )}
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
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
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
                          className="default-input"
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
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
                        {errors.pinCode && (
                          <p className="text-red-500">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="dpUrl"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                      >
                        Profile Picture URL
                      </label>
                      <div className="mt-2">
                        <input
                          type="url"
                          {...register("dpUrl", {
                            required: "dpUrl is required",
                          })}
                          id="dpUrl"
                          className="default-input"
                        />
                        {errors.dpUrl && (
                          <p className="text-red-500">{errors.dpUrl.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <motion.button
                    onClick={(e) => setShowAddAddressForm(false)}
                    type="submit"
                    className="inline-flex rounded-md px-3 border-2 py-2 text-sm font-semibold text-grey text-red-900 dark:text-red-200 shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-red-600/50"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#FF0000",
                      color: "#FFFFFF",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AiFillCloseSquare className="mt-0.5 mr-1" />
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="inline-flex rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    whileHover={{ scale: 1.05, backgroundColor: "#4CAF50" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AiOutlineHome className="mt-0.5 mr-1" />
                    Add Address
                  </motion.button>
                </div>
              </div>
            </form>
          ) : null}

          <p className="mt-0.5 text-sm text-gray-500">Your Addresses :</p>
          {userInfo?.addresses &&
            userInfo.addresses.map((address: any, index: any) => (
              <div key={index}>
                {selectedEditIndex === index ? (
                  <form
                    className="default-card px-5 py-12 mt-12"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      console.log(data);
                      handleEdit(data, index);
                      reset();
                    })}
                  >
                    <div className="space-y-12 ">
                      <div className="border-b dark:border-gray-400/25 border-gray-900/10  pb-12 rounded-2xl">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900 dark:text-gray-200">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                          Use a permanent address where you can receive mail.
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
                              {errors.name && (
                                <p className="text-red-500">
                                  {errors.name.message}
                                </p>
                              )}
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
                              {errors.email && (
                                <p className="text-red-500">
                                  {errors.email.message}
                                </p>
                              )}
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
                              {errors.phone && (
                                <p className="text-red-500">
                                  {errors.phone.message}
                                </p>
                              )}
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
                              {errors.street && (
                                <p className="text-red-500">
                                  {errors.street.message}
                                </p>
                              )}
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
                              {errors.city && (
                                <p className="text-red-500">
                                  {errors.city.message}
                                </p>
                              )}
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
                                className="default-input"
                              />
                              {errors.state && (
                                <p className="text-red-500">
                                  {errors.state.message}
                                </p>
                              )}
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
                              {errors.pinCode && (
                                <p className="text-red-500">
                                  {errors.pinCode.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="dpUrl"
                              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                            >
                              Profile Picture URL
                            </label>
                            <div className="mt-2">
                              <input
                                type="url"
                                {...register("dpUrl", {
                                  required: "dpUrl is required",
                                })}
                                id="dpUrl"
                                className="default-input"
                              />
                              {errors.dpUrl && (
                                <p className="text-red-500">
                                  {errors.dpUrl.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <motion.button
                          onClick={(e) => setSelectedEditIndex(-1)}
                          type="submit"
                          className="inline-flex rounded-md px-3 border-2 py-2 text-sm font-semibold text-grey text-red-900 dark:text-red-200 shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-red-600/50"
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#FF0000",
                            color: "#FFFFFF",
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <AiFillCloseSquare className="mt-0.5 mr-1" />
                          Cancel
                        </motion.button>
                        <motion.button
                          type="submit"
                          className="inline-flex rounded-md bg-blue-800 hover:bg-blue-500 dark:bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm dark:hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#1E40AF",
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <AiOutlineEdit className="mt-0.5 mr-1" />
                          Edit Address
                        </motion.button>
                      </div>
                    </div>
                  </form>
                ) : null}
                <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 dark:border-gray-400/25 border-gray-900/10 rounded-xl mb-2 mt-2">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-900 dark:text-gray-200">
                        {address.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-900 dark:text-gray-200">
                        {address.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900 dark:text-gray-200">
                      Phone: {address.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {address.city}
                    </p>
                  </div>
                  <div className="sm:flex sm:flex-col sm:items-end">
                    <motion.button
                      onClick={(e) => handleEditForm(index)}
                      type="button"
                      className="md:font-semibold text-sm mb-6 md:text-base text-blue-500 hover:text-blue-500 flex items-center"
                      whileHover={{ scale: 1.05, color: "#1E40AF" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AiOutlineEdit />
                      Edit
                    </motion.button>

                    <motion.button
                      onClick={(e) => handleRemove(e, index)}
                      type="button"
                      className="md:font-semibold text-sm md:text-base text-red-600 hover:text-red-500 flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                      >
                        <MdDeleteForever />
                      </motion.span>
                      Remove
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
