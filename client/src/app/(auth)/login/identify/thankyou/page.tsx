"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 md:w-[72rem] mx-3 md:mx-auto my-6 default-card text-md md:text-lg">
      <h1 className="text-4xl">THANK YOU!</h1>
      <br />
      <p>Please use the following link to reset your password: [link]</p>
      <br />
      <p>
        If you have any comments or questions do not hesitate to reach us at
        [email to customer portal support team] Please feel free to respond to
        this email. It was sent from a monitored email address, and we would
        love to hear from you.
      </p>
      <br />
      <p className="mt-10 text-center text-sm text-gray-500">
        Return to{" "}
        <button
          className="font-semibold leading-6 text-orange-600 dark:text-orange-600 hover:text-orange-400 dark:hover:text-orange-400"
          onClick={() => {
            router.push("/login");
          }}
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default Page;
