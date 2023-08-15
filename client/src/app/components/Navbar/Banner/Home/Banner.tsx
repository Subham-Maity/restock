import React from "react";
import Switcher from "@/app/components/Mode/Switcher";
import Carousel from "@/app/components/Carousel/Home/Carousel";

const Banner = () => {
  return (
    <header className="bg-gray-200 dark:bg-[#25293c] mx rounded-3xl mt-4 mx-4 max-w-8xl px-4 sm:px-6 lg:px-12 py-2 sm:py-2 lg:py-2">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl dark:text-gray-200 font-bold tracking-tight text-gray-900">
            <div className="bg-cover bg-center  h-auto text-white py-24 px-10 object-fill background-image: url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)">
                <div className="md:w-1/2">
                    <Carousel/>
                    <p className="font-bold text-sm uppercase">Services</p>
                    <p className="text-3xl font-bold">Multimedia products</p>
                    <p className="text-2xl mb-10 leading-none">Atractive designs for your brand</p>
                    <a href="#" className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Contact us</a>
                </div>
            </div>
        </h1>
      </div>
    </header>
  );
};

export default Banner;
