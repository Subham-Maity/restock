"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const router = useRouter();
  return (
    <div>
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 md:w-[32rem] mx-3  md:mx-auto my-6 bg-gray-100 rounded-2xl dark:bg-slate-700">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
              height={100}
              width={100}
            />
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
              Identify
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <p className="mb-5  dark:text-gray-200">
                  Enter the email address associated with your account and we will
                  send you a link to reset your password.
                </p>
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
                    value={email}
                    autoComplete="email"
                    placeholder="example@domain.com"
                    onChange={handleEmailChange}
                    required
                    className="block w-full rounded-2xl border-0 py-auto text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <Link href="/login/identify/thankyou">
                <button
                  type="submit"
                  disabled={!email}
                  className="flex w-28 justify-center rounded-3xl bg-orange-600 active:bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 mx-auto"
                  
                >
                  Continue
                </button>
                </Link>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
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
    </div>
  );
};

export default Page;
