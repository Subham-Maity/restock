"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { flushSync } from "react-dom";
import { useSelector, useDispatch } from 'react-redux'
import {fetchBannerApiAsync} from '@/lib/features/Banner/bannerSlice'

const TWEEN_FACTOR = 1.2;
type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const dispatch = useDispatch();
  const [slides_new,setSlides_new]=useState([0]);
  let image=useSelector((state:any)=>state.banner.images);
  // useEffect(()=>{
  //   console.log("image",image);
  // },[])

  const { slides, options } = props;
  const autoplayOptions = {
    delay: 3000,
    stopOnInteraction: false,
  };
  const plugins = [Autoplay(autoplayOptions)];

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [tweenValues, setTweenValues] = useState<number[]>([]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget * (-1 / TWEEN_FACTOR) * 100;
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on("scroll", () => {
      flushSync(() => onScroll());
    });
    emblaApi.on("reInit", onScroll);
  }, [emblaApi, onScroll]);

  useEffect(()=>{
    // @ts-ignore
    dispatch(fetchBannerApiAsync());
  },[])

  useEffect(()=>{
    setSlides_new(Array.from(Array(image.length).keys()));
  },[image])


  return (
    <div className="embla rounded-b-2xl">
      <div className="embla__viewport rounded-b-2xl" ref={emblaRef}>
        <div className="embla__container  h-[150px] sm:h-[180px] md:h-[300px] lg:h-[400px] xl:h-[550px] 2xl:h-[700px]">

          {slides_new.map((index) => (
            <div className="embla__slide " key={index}>
              <div className="embla__slide__number ">
                <span>{index + 1}</span>
              </div>
              <div className="embla__parallax ">
                <div
                  className="embla__parallax__layer "
                  style={{
                    ...(tweenValues.length && {
                      transform: `translateX(${tweenValues[index]}%)`,
                    }),
                  }}
                >
                  {/*{console.log("res",image)}*/}
                  {/*{console.log("res",image[index].href)}*/}
                  {/*{console.log("res",index)}*/}
                  {/*{image=0}*/}
                  {image[index].href?
                      <Image className=" embla__slide__img embla__parallax__img" src={image[index].href} alt={"banner Images 1"} fill/>:
                      <Image className=" embla__slide__img embla__parallax__img" src={"https://github.com/Subham-Maity/restock/blob/main/client/public/BannerPoster/1.jpg?raw=true"} alt={"banner Images 2"} fill/>}


                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
