'use client';
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import imageByIndex from './imageByIndex'
import Autoplay from 'embla-carousel-autoplay'
import Image from "next/image";
import {flushSync} from "react-dom";

const TWEEN_FACTOR = 1.2

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const autoplayOptions = {
        delay: 3000,
        stopOnInteraction:false
    }
    const plugins = [Autoplay(autoplayOptions)]
    // @ts-ignore
    const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)
    const [tweenValues, setTweenValues] = useState<number[]>([])

    const onScroll = useCallback(() => {
        if (!emblaApi) return

        const engine = emblaApi.internalEngine()
        const scrollProgress = emblaApi.scrollProgress()

        const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
            let diffToTarget = scrollSnap - scrollProgress

            if (engine.options.loop) {
                engine.slideLooper.loopPoints.forEach((loopItem) => {
                    const target = loopItem.target()
                    if (index === loopItem.index && target !== 0) {
                        const sign = Math.sign(target)
                        if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
                        if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
                    }
                })
            }
            return diffToTarget * (-1 / TWEEN_FACTOR) * 100
        })
        setTweenValues(styles)
    }, [emblaApi, setTweenValues])

    useEffect(() => {
        if (!emblaApi) return
        onScroll()
        emblaApi.on('scroll', () => {
            flushSync(() => onScroll())
        })
        emblaApi.on('reInit', onScroll)
    }, [emblaApi, onScroll])

    return (
        <div className="embla">
            <div className="embla__viewport h-full sm:h-full" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number">
                                <span>{index + 1}</span>
                            </div>
                            <div className="embla__parallax">
                                <div
                                    className="embla__parallax__layer"
                                    style={{
                                        ...(tweenValues.length && {
                                            transform: `translateX(${tweenValues[index]}%)`
                                        })
                                    }}
                                >
                                    <Image
                                        className="embla__slide__img embla__parallax__img"
                                        src={imageByIndex(index)}
                                        alt="Your alt text"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
