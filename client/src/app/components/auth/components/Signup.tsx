"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
import {
  selectLoggedInUser,
  createUserAsync,
} from "@/app/components/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import CustomButton from "@/app/components/CustomButton/CustomButton";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  console.log(errors);
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const router = useRouter();
  return (
    <>
      {user && router.push("/")}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 md:w-[32rem] mx-3  md:mx-auto my-6 default-card">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="font-bold text-2xl dark:text-gray-400 text-neutral-900">
            Our Logo
          </p>
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
            Create a new Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(
                createUserAsync({
                  email: data.email,
                  password: data.password,
                  addresses: [],
                  role: "user",
                })
              );
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="ml-1 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
              >
                Email address
              </label>
              <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 dark:bg-[#303030] bg-stone-300 border border-gray-400/20 rounded-2xl pr-2">
                <div className="flex justify-center w-15 p-3">
                  <span className="flex items-center leading-normal dark:bg-[#303030] bg-stone-300 border-0 text-3xl text-gray-600">
                    <AiOutlineUser className="text-gray-800 dark:text-gray-400 animate-pulse" />
                  </span>
                </div>

                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                  })}
                  type="email"
                  placeholder="example@domain.com"
                  className="block w-full rounded-xl h-11 bg-white bg-opacity-40 dark:bg-stone-950/20 shadow-2xl  dark:border-gray-600 dark:placeholder-gray-400 placeholder:font-bold dark:text-white focus:ring-stone-700 focus:border-blue-800 text-sm xl:text-base sm:leading-6 flex-shrink flex-grow flex-1 leading-normal border-0 border-grey-light px-3 self-center relative font-roboto outline-none"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="ml-1 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Password
                </label>
              </div>
              <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 dark:bg-[#303030] bg-stone-300 border border-gray-400/20 rounded-xl pr-2 mt-2">
                <div className="flex justify-center w-15 p-3">
                  <span className="flex items-center leading-normal dark:bg-[#303030] bg-stone-300 border-0 text-3xl text-gray-600">
                    <AiOutlineLock className="text-gray-800 dark:text-gray-400 animate-pulse" />
                  </span>
                </div>

                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  placeholder="12345@Password"
                  className="block w-full rounded-xl h-11 bg-white bg-opacity-40 dark:bg-stone-950/20 shadow-2xl dark:border-gray-600 dark:placeholder-gray-400 placeholder:font-bold dark:text-white focus:ring-stone-700 focus:border-blue-800 text-sm xl:text-base sm:leading-6 flex-shrink flex-grow flex-1 leading-normal border-0 border-grey-light px-3 self-center relative font-roboto outline-none"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="ml-1 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Repeat Password
                </label>
              </div>
              <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 dark:bg-[#303030] bg-stone-300 border border-gray-400/20 rounded-xl pr-2 mt-2">
                <div className="flex justify-center w-15 p-3">
                  <span className="flex items-center leading-normal dark:bg-[#303030] bg-stone-300 border-0 text-3xl text-gray-600">
                    <AiOutlineLock className="text-gray-800 dark:text-gray-400 animate-pulse" />
                  </span>
                </div>

                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  placeholder="12345@Password"
                  className="block w-full rounded-xl h-11 bg-white bg-opacity-40 dark:bg-stone-950/20 shadow-2xl dark:border-gray-600 dark:placeholder-gray-400 placeholder:font-bold dark:text-white focus:ring-stone-700 focus:border-blue-800 text-sm xl:text-base sm:leading-6 flex-shrink flex-grow flex-1 leading-normal border-0 border-grey-light px-3 self-center relative font-roboto outline-none"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6 items-center">
              <CustomButton
                className="animated-btn py-3 w-full font-bold"
                title="Create Account"
                type="submit"
                animated
                icon={<FaArrowRight />}
              />
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-500 dark:text-indigo-500 hover:text-indigo-400 dark:hover:text-indigo-400"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
