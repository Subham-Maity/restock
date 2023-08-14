import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";



const Carousel = () => {

  const slides = [
      {
        url: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        url: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        url: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        url: "https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
    ];

    const [current, setCurrent] = useState(0);

    const prev = () => {
      const isFirst = current === 0;
      const newIndex = isFirst ? slides.length - 1 : current -1;
      setCurrent(newIndex);
    }

    const next = () => {
      const isLast = current === slides.length -1;
      const newIndex = isLast ? 0 : current + 1;
      setCurrent(newIndex);
    }


     return(
      <div className="max-w-[800px] h-[450px] w-full mx-auto my-6 relative group">
        <div style={{backgroundImage: `url(${slides[current].url})`}} className="w-full h-full rounded-xl bg-center bg-cover duration-500 shadow-xl group"></div>

        {/* Buttons*/}
        <div className="flex absolute inset-0 items-center justify-between px-3 ">
        {/* Left Arrow */}
        <button className="w-7 m-1 p-1 hover:w-8 bg-white/70 text-black rounded-2xl"
        onClick={prev}>
        <ChevronLeftIcon/>
        </button>
        {/* Right Arrow */}
        <button className="w-7 m-1 p-1 hover:w-8 bg-white/70 text-black rounded-2xl"
        onClick={next}>
        <ChevronRightIcon/>
        </button>
        </div>
      </div>
     )

  }

  export default Carousel;
