import React from 'react';
import EmblaCarousel from "@/app/components/Carousel/Carousel2/EmblaCarousel";
import {EmblaOptionsType} from "embla-carousel-react";
const OPTIONS: EmblaOptionsType = { loop: true, inViewThreshold: 0 };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
function Ambient() {
    return (
        <main className="sandbox h-20">
            <section className="sandbox__carousel">
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </section>
        </main>
    );
}

export default Ambient;