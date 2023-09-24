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
import CustomButton from "@/app/components/CustomButton/CustomButton";

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
      {user && router.push("/")}
      <div className="flex min-h-full flex-1 shadow-lg shadow-gray-700 flex-col justify-center px-6 py-12 lg:px-8 md:w-[32rem] mx-3  md:mx-auto my-6 default-card">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h1 className="text-center border border-gray-600/30 rounded-xl p-4 text-4xl font-bold leading-9 tracking-tight text-gray-600 dark:text-gray-500">
            RESTOCK
          </h1>
          <h2 className="mt-10 text-left text-3xl font-bold leading-9 tracking-tight text-gray-600 dark:text-gray-500">
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
                })
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
              <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 dark:bg-[#303030] bg-stone-300 border border-gray-400/20 rounded-xl pr-2">
                <div className="flex -mr-px justify-center w-15 pt-4 p-4">
                  <span className="flex items-center leading-normal dark:bg-[#303030] bg-stone-300 border-0 text-2xl text-gray-600">
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
                  className="block w-full rounded-xl h-11 bg-white bg-opacity-40 dark:bg-stone-950/20 shadow-2xl  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-stone-700 focus:border-blue-800 text-sm xl:text-base sm:leading-6 flex-shrink flex-grow flex-1 leading-normal border-0 border-grey-light px-3 self-center relative font-roboto outline-none"
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
                <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 dark:bg-[#303030] bg-stone-300 border border-gray-400/20 rounded-xl pr-2">
                  <div className="flex -mr-px justify-center w-15 pt-4 p-4">
                    <span className="flex items-center leading-normal dark:bg-[#303030] bg-stone-300 border-0 text-2xl text-gray-600">
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
                    className="block w-full rounded-xl h-11 bg-white bg-opacity-40 dark:bg-stone-950/20 shadow-2xl dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-stone-700 focus:border-blue-800 text-sm xl:text-base sm:leading-6 flex-shrink flex-grow flex-1 leading-normal border-0 border-grey-light px-3 self-center relative font-roboto outline-none"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 items-center blur-[sm]">
              <CustomButton 
                className="animated-btn py-2 w-full font-bold"
                title="Log in"
                type="submit"
                animated
                icon={<FaArrowRight />}
              />
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
