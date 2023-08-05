import React from "react";
import Switcher from "@/app/components/Mode/Switcher";

const Banner = () => {
  return (
    <header className="bg-gray-200 dark:bg-[#25293c] rounded-full mt-4 mx-auto max-w-8xl px-4 sm:px-6 lg:px-12 py-2 sm:py-2 lg:py-2">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl dark:text-gray-200 font-bold tracking-tight text-gray-900">
          Video Hover <Switcher />
        </h1>
      </div>
    </header>
  );
};

export default Banner;
