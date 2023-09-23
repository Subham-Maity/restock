"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};
import {
  selectLoggedInUser,
  checkUserAsync,
  selectError,
} from "@/app/components/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  console.log(errors);
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const router = useRouter();

  return (
    <>
      <div className="flex min-h-full flex-1 shadow-lg shadow-gray-700 flex-col justify-center px-6 py-12 lg:px-8 md:w-[32rem] mx-3  md:mx-auto my-6 default-card">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h1 className="text-center border border-gray-600/30 rounded-2xl p-4 text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-500">
            RESTOCK
          </h1>
          <h2 className="mt-10 text-left text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-500">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(
                checkUserAsync({
                  email: data.email,
                  password: data.password,
                }),
              );
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="ml-1 block mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
              >
                Email address
              </label>
              <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 bg-[#303030] border border-gray-400/20 rounded-2xl pr-2">
                <div className="flex -mr-px justify-center w-15 pt-4 p-4">
                  <span className="flex items-center leading-normal bg-[#303030] border-0 text-2xl text-gray-600">
                    <AiOutlineUser className="text-gray-400 animate-pulse" />
                  </span>
                </div>

                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                  })}
                  type="email"
                  placeholder="example@domain.com"
                  className="block w-full rounded-2xl h-11 bg-white bg-opacity-40 dark:bg-stone-950/20 shadow-2xl  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-stone-700 focus:border-blue-800 sm:text-sm sm:leading-6 flex-shrink flex-grow flex-1 leading-normal  border-0 border-grey-light px-3 self-center relative  font-roboto text-xl outline-none"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="mt-2"></div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Password
                </label>
                <div className="text-sm">
                  <button
                    onClick={() => {
                      router.push("/login/identify");
                    }}
                    className="font-semibold leading-6 text-indigo-600 dark:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-400"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 bg-[#303030] border border-gray-400/20 rounded-2xl pr-2">
                  <div className="flex -mr-px justify-center w-15 pt-4 p-4">
                    <span className="flex items-center leading-normal bg-[#303030] border-0 text-2xl text-gray-600">
                      <AiOutlineLock className="text-gray-400 animate-pulse" />
                    </span>
                  </div>

                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    placeholder="12345@Password"
                    className="block w-full rounded-2xl h-11 bg-white bg-opacity-40 dark:bg-stone-950/20 shadow-2xl dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-stone-700 focus:border-blue-800 sm:text-sm sm:leading-6 flex-shrink flex-grow flex-1 leading-normal border-0 border-grey-light px-3 self-center relative font-roboto text-xl outline-none"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 items-center blur-[sm]">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center sm:w-full p-4 py-3 overflow-hidden font-medium text-indigo-500 transition duration-100 ease-out border-2 dark:border-indigo-500/30 rounded-2xl shadow-xl group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-2xl duration-100 -translate-x-full bg-indigo-600 dark:bg-indigo-500 group-hover:translate-x-0 ease">
                  <FaArrowRight />
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-indigo-500 dark:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Log in
                </span>
                <span className="relative invisible">Log in</span>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <button
              className="font-semibold leading-6 text-indigo-600 dark:text-indigo-600 hover:text-indigo-500 dark:hover:text-indigo-400"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Sign up now
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
