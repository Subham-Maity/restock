import './base.css'
import './sandbox.css'
import './embla.css'
import EmblaCarousel from '../EmblaCarousel'
import {EmblaOptionsType} from "embla-carousel-react";
import React from "react";


const OPTIONS: EmblaOptionsType = { inViewThreshold: 0, dragFree: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const NewCarousel = () => {
    return (
        <>
            <main className="sandbox">
                <section className="sandbox__carousel">
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </section>
            </main>
        </>
    );
};

export default NewCarousel;