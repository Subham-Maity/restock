import React from 'react';

import {EmblaOptionsType} from "embla-carousel-react";
import EmblaCarousel from "@/components/Carousel/Carousel2/EmblaCarousel";
const OPTIONS: EmblaOptionsType = { loop: true, inViewThreshold: 0 };
const SLIDE_COUNT = 4;
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