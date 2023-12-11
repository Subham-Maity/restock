"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {
  selectLoggedInUser,
  createUserAsync,
} from "@/lib/features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import CustomButton from "@/components/CustomButton/CustomButton";
import {
  AiFillCheckCircle,
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineExclamationCircle,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const router = useRouter();

  const [passType, setPassType] = useState("password");
  const [confirmPasstype, setConfirmPassType] = useState("password");

  // validated states
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  const handleChange = (value: any) => {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,})");
    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }
    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }
    if (number.test(value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
    if (length.test(value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
  };

  // console.log(errors.email, errors.confirmPassword, 'lmao');
  return (
    <>
      {user && router.push("/")}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 md:w-[32rem] mx-3 md:mx-auto default-card">
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
              <div className="flex flex-wrap items-stretch w-full relative h-15 dark:bg-[#303030] bg-stone-300 border border-gray-400/20 rounded-2xl pr-2">
                <div className="flex justify-center w-15 p-3">
                  <span className="flex items-center leading-normal dark:bg-[#303030] bg-stone-300 border-0 text-3xl text-gray-600">
                    <AiOutlineUser className="text-gray-800 dark:text-gray-400 animate-pulse" />
                  </span>
                </div>

                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Invalid Email Address",
                    },
                  })}
                  type="email"
                  placeholder="example@domain.com"
                  className="block w-full rounded-xl h-11 bg-white bg-opacity-40 dark:bg-stone-950/20 shadow-2xl  dark:border-gray-600 dark:placeholder-gray-400 placeholder:font-bold dark:text-white focus:ring-stone-700 focus:border-blue-800 text-sm xl:text-base sm:leading-6 flex-shrink flex-grow flex-1 leading-normal border-0 border-grey-light px-3 self-center relative font-roboto outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 flex justify-center">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="ml-1 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  New Password
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
                    required: "password is required",
                  })}
                  type={passType}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="12345@Password"
                  className="block w-full rounded-xl h-11 bg-white bg-opacity-40 dark:bg-stone-950/20 shadow-2xl dark:border-gray-600 dark:placeholder-gray-400 placeholder:font-bold dark:text-white focus:ring-stone-700 focus:border-blue-800 text-sm xl:text-base sm:leading-6 flex-shrink flex-grow flex-1 leading-normal border-0 border-grey-light px-3 self-center relative font-roboto outline-none"
                />
                {passType === "password" ? (
                  <span
                    className="my-auto pl-2 hidden sm:block"
                    onClick={() => setPassType("text")}
                  >
                    <AiFillEyeInvisible size={20} />
                  </span>
                ) : (
                  <span
                    className="my-auto pl-2 hidden sm:block"
                    onClick={() => setPassType("password")}
                  >
                    <AiFillEye size={20} />
                  </span>
                )}
              </div>
              <div className="bg-white bg-opacity-40 dark:bg-stone-950/20 p-4 rounded-md">
                {/* validation tracker */}
                <main className="tracker-box">
                  <div
                    className={`flex gap-2 ${
                      lowerValidated
                        ? "text-gray-950 dark:text-gray-200 font-bold"
                        : "text-gray-400 dark:text-gray-600 font-semibold"
                    }`}
                  >
                    {lowerValidated ? (
                      <AiFillCheckCircle className="text-green-500 dark:text-green-400 my-auto" />
                    ) : (
                      <AiOutlineExclamationCircle className="text-red-500 my-auto" />
                    )}
                    At least one lowercase letter
                  </div>
                  <div
                    className={`flex gap-2 ${
                      upperValidated
                        ? "text-gray-950 dark:text-gray-200 font-bold"
                        : "text-gray-400 dark:text-gray-600 font-semibold"
                    }`}
                  >
                    {upperValidated ? (
                      <AiFillCheckCircle className="text-green-500 dark:text-green-400 my-auto" />
                    ) : (
                      <AiOutlineExclamationCircle className="text-red-500 my-auto" />
                    )}
                    At least one uppercase letter
                  </div>
                  <div
                    className={`flex gap-2 ${
                      numberValidated
                        ? "text-gray-950 dark:text-gray-200 font-bold"
                        : "text-gray-400 dark:text-gray-600 font-semibold"
                    }`}
                  >
                    {numberValidated ? (
                      <AiFillCheckCircle className="text-green-500 dark:text-green-400 my-auto" />
                    ) : (
                      <AiOutlineExclamationCircle className="text-red-500 my-auto" />
                    )}
                    At least one number
                  </div>
                  <div
                    className={`flex gap-2 ${
                      specialValidated
                        ? "text-gray-950 dark:text-gray-200 font-bold"
                        : "text-gray-400 dark:text-gray-600 font-semibold"
                    }`}
                  >
                    {specialValidated ? (
                      <AiFillCheckCircle className="text-green-500 dark:text-green-400 my-auto" />
                    ) : (
                      <AiOutlineExclamationCircle className="text-red-500 my-auto" />
                    )}
                    At least one special character
                  </div>
                  <div
                    className={`flex gap-2 ${
                      lengthValidated
                        ? "text-gray-950 dark:text-gray-200 font-bold"
                        : "text-gray-400 dark:text-gray-600 font-semibold"
                    }`}
                  >
                    {lengthValidated ? (
                      <AiFillCheckCircle className="text-green-500 dark:text-green-400 my-auto" />
                    ) : (
                      <AiOutlineExclamationCircle className="text-red-500 my-auto" />
                    )}
                    At least 8 characters
                  </div>
                </main>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="ml-1 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Confirm Password
                </label>
              </div>
              <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 dark:bg-[#303030] bg-stone-300 border border-gray-400/20 rounded-xl pr-2 mt-2">
                <div className="flex justify-center w-15 p-3">
                  <span className="flex items-center leading-normal dark:bg-[#303030] bg-stone-300 border-0 text-3xl text-gray-600">
                    <AiOutlineLock className="text-gray-800 dark:text-gray-400 animate-pulse" />
                  </span>
                </div>

                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value, formValues) =>
                      value === formValues.password || "Password mismatch",
                  })}
                  type={confirmPasstype}
                  placeholder="12345@Password"
                  className="block w-full rounded-xl h-11 bg-white bg-opacity-40 dark:bg-stone-950/20 shadow-2xl dark:border-gray-600 dark:placeholder-gray-400 placeholder:font-bold dark:text-white focus:ring-stone-700 focus:border-blue-800 text-sm xl:text-base sm:leading-6 flex-shrink flex-grow flex-1 leading-normal border-0 border-grey-light px-3 self-center relative font-roboto outline-none"
                />
                {confirmPasstype === "password" ? (
                  <span
                    className="my-auto pl-2"
                    onClick={() => setConfirmPassType("text")}
                  >
                    <AiFillEyeInvisible size={20} />
                  </span>
                ) : (
                  <span
                    className="my-auto pl-2"
                    onClick={() => setConfirmPassType("password")}
                  >
                    <AiFillEye size={20} />
                  </span>
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
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
