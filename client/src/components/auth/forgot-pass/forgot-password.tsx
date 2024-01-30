"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  console.log(errors);

  const router = useRouter();
  return (
      <div>
        <div>
          <form
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
              className="space-y-6"
          >
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 md:w-[32rem] mx-3  md:mx-auto my-6 default-card">
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
                      Enter the email address associated with your account and we
                      will send you a link to reset your password.
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
                          {...register("email", {
                            required: "email is required",
                            pattern: {
                              value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                              message: "email not valid",
                            },
                          })}
                          type="email"
                          className="default-input"
                      />
                      {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 sm:mx- items-center blur-[sm]">
                    <Link
                        href=""
                        className="relative inline-flex items-center justify-center sm:w-full p-4 py-3 overflow-hidden font-medium text-indigo-500 transition duration-100 ease-out border-2 dark:border-indigo-500/30 rounded-2xl shadow-xl group"
                    >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-2xl duration-100 -translate-x-full bg-indigo-600 dark:bg-indigo-500 group-hover:translate-x-0 ease">
                      <FaArrowRight />
                    </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-indigo-500 dark:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-full ease">
                      Continue
                    </span>
                      <span className="relative invisible">Button Text</span>
                    </Link>
                  </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
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
          </form>
        </div>
      </div>
  );
};

export default ForgotPassword;
