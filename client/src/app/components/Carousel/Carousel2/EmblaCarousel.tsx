"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { flushSync } from "react-dom";
import { useSelector, useDispatch } from 'react-redux'
import {fetchApiAsync} from '@/app/components/Carousel/Carousel2/bannerSlice'

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
    dispatch(fetchApiAsync());
  },[])

  useEffect(()=>{
    setSlides_new(Array.from(Array(image.length).keys()));
  },[image])


  return (
    <div className="embla rounded-2xl">
      <div className="embla__viewport rounded-2xl" ref={emblaRef}>
        <div className="embla__container  h-[180px] sm:h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px]">

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
                  <Image className=" embla__slide__img embla__parallax__img" src={image?image[index].href:"https://github.com/Subham-Maity/restock/blob/main/client/public/BannerPoster/5.jpg?raw=true"} alt={"Banner Images"} fill/>

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
