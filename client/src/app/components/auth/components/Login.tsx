"use client";
import React from "react";
import { router } from "next/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Login.module.css";

const Login = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 md:w-[32rem] mx-3  md:mx-auto my-6 bg-white bg-opacity-40 dark:bg-black/30 shadow-2xl rounded-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
            height={100}
            width={100}
          />
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-2xl border-0 py-auto text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                />
              </div>
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
                    className="font-semibold leading-6 text-orange-600 dark:text-orange-600 hover:text-orange-400 dark:hover:text-orange-400"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-2xl border-0 py-auto text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button className={styles.button} type="submit">
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <button
              className="font-semibold leading-6 text-orange-600 dark:text-orange-600 hover:text-orange-400 dark:hover:text-orange-400"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Sign up now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
