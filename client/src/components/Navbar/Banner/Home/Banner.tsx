import "../../../Carousel/Carousel2/base.css";
import "../../../Carousel/Carousel2/sandbox.css";
import "../../../Carousel/Carousel2/embla.css";
import EmblaCarousel from "../../../Carousel/Carousel2/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel-react";
import Ambient from "@/components/Navbar/Banner/Home/Ambient";


const OPTIONS: EmblaOptionsType = { loop: true, inViewThreshold: 0 };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Banner = () => {
  return (
    <>
      <Ambient />
      <main className="sandbox">
        <section className="sandbox__carousel">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
      </main>
    </>
  );
};

export default Banner;
