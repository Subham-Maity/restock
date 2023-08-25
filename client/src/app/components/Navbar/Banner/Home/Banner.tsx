// import React from "react";
// // import Carousel from "@/app/components/Carousel/Home/Carousel";
// // import CarouselNew from "@/app/components/Carousel/Home/CarouselNew";
// import newCarousel from "@/app/components/Carousel/Carousel2/newCarousel";
// import EmblaCarousel from "@/app/components/Carousel/EmblaCarousel";
// const images = [
//   {
//     id: 1,
//     src: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     alt: "First image",
//   },
//   {
//     id: 2,
//     src: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     alt: "Second image",
//   },
//   {
//     id: 3,
//     src: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     alt: "Third image",
//   },
//   {
//     id: 4,
//     src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//     alt: "Fourth image",
//   },
// ];


import '../../../Carousel/Carousel2/base.css'
import '../../../Carousel/Carousel2/sandbox.css'
import '../../../Carousel/Carousel2/embla.css'
import EmblaCarousel from '../../../Carousel/Carousel2/EmblaCarousel'
import {EmblaOptionsType} from "embla-carousel-react";
import React from "react";


const OPTIONS: EmblaOptionsType = { loop:true, inViewThreshold: 0 }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Banner = () => {
  return (
    // <header className="bg-gray-200 dark:bg-[#25293c] rounded-3xl mt-4 mx-4">
    //   <div className="mx-auto max-w-7xl">
    //     <h1 className="text-3xl dark:text-gray-200 font-bold tracking-tight text-gray-900">
    //       <div className="bg-cover bg-center h-auto text-white background-image: url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)">
    //         <div className="">
    //           <Carousel props={images} />

      // <div className="h-56 m-5 rounded-2xl">
      //         <CarouselNew props={images}/>
      // </div>
      // <>
      //   {newCarousel()}
      // </>
      <>
        <main className="sandbox ">
          <section className="sandbox__carousel">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </section>
        </main>
      </>
    //         </div>
    //       </div>
    //     </h1>
    //   </div>
    // </header>
  );
};

export default Banner;
