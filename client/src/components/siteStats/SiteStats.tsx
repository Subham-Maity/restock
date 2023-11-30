"use client";

import CountUp from "react-countup";
import { useRef, useEffect, useState } from "react";

function Carousel2() {
  const myRef = useRef<HTMLDivElement | null>(null);
  const [myElementIsVisible, setMyElementIsVisible] = useState();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      // @ts-ignore
      setMyElementIsVisible(entry.isIntersecting);
    });
    // @ts-ignore
    observer.observe(myRef.current);
  }, []);

  return (
    <>
      <div className="lg:mx-16 max-w-8xl px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2 mt-4 mb-4 ">
        <div className="w-full">
          <div className="product-card mb-4 shadow-xl object-cover w-full rounded-2xl">
            <div className="mx-auto flex-col font-roboto font-bold w-full flex justify-evenly flex-wrap items-center gap-4 text-black dark:text-white py-6 lg:py-none lg:h-[500px]">
              <div className="lg:w-[70%] flex flex-col justify-center items-center gap-4">
                <h1 className="text-5xl font-sacra ">
                  <span> Our </span>
                  <span className="text-indigo-700"> Facts</span>
                </h1>
                <p className="text-sm p-2 ml-2 lg:text-lg">
           Restock is a platform where you can buy and sell your products.
                </p>
              </div>
              <div
                ref={myRef}
                className="flex flex-wrap gap-2 md:gap-4 justify-center items-center"
              >
                <div className="flex flex-col items-center justify-center gap-4 h-[100px] w-[110px] sm:h-[120px] sm:w-[160px] lg:h-[200px] lg:w-[200px] bg-gray-300/25 border-gray-400/75 border-2 border-primaryButton rounded-xl hover:border-text hover:scale-[1.05] transiton-all ease-in-out duration-500 py-5 px-3 lg:p-2">
                  <span className="text-base md:text-xl lg:text-4xl font-abril">
                    +{" "}
                    {myElementIsVisible ? (
                      <CountUp end={1204} />
                    ) : (
                      <CountUp end={0} />
                    )}
                  </span>
                  <p className="text-xs sm:text-sm lg:text-base">Total Items</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 h-[100px] w-[110px] sm:h-[120px] sm:w-[160px] lg:h-[200px] lg:w-[200px] bg-gray-300/25 border-gray-400/75 border-2 border-primaryButton rounded-xl hover:border-text hover:scale-[1.05] transiton-all ease-in-out duration-500 py-5 px-3 lg:p-2">
                  <span className="text-base md:text-xl lg:text-4xl font-abril">
                    +
                    {myElementIsVisible ? (
                      <CountUp end={56785} />
                    ) : (
                      <CountUp end={0} />
                    )}
                  </span>
                  <p className="text-xs sm:text-sm lg:text-base">Total Sales</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 h-[100px] w-[110px] sm:h-[120px] sm:w-[160px] lg:h-[200px] lg:w-[200px] bg-gray-300/25 border-gray-400/75 border-2 border-primaryButton rounded-xl hover:border-text hover:scale-[1.05] transiton-all ease-in-out duration-500 py-5 px-3 lg:p-2">
                  <span className="text-base md:text-xl lg:text-4xl font-abril">
                    +
                    {myElementIsVisible ? (
                      <CountUp end={6235} />
                    ) : (
                      <CountUp end={0} />
                    )}
                  </span>
                  <p className="text-xs sm:text-sm lg:text-base">Total Users</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 h-[100px] w-[110px] sm:h-[120px] sm:w-[160px] lg:h-[200px] lg:w-[200px] bg-gray-300/25 border-gray-400/75 border-2 border-primaryButton rounded-xl hover:border-text hover:scale-[1.05] transiton-all ease-in-out duration-500 py-5 lg:p-2">
                  <span className="text-base md:text-xl lg:text-4xl font-abril">
                    +
                    {myElementIsVisible ? (
                      <CountUp end={6235} />
                    ) : (
                      <CountUp end={0} />
                    )}
                  </span>
                  <p className="text-xs sm:text-sm lg:text-base">
                    Total Download
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel2;
