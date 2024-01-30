import "@/components/ui/embla-carousel/base.css";
import "@/components/ui/embla-carousel/sandbox.css";
import "@/components/ui/embla-carousel/embla.css";
import EmblaCarousel from "@/components/ui/embla-carousel/embla-carousel";
import { EmblaOptionsType } from "embla-carousel-react";
import HomeAmbient from "@/components/common/home/home-banner/home-ambient";

const OPTIONS: EmblaOptionsType = { loop: true, inViewThreshold: 0 };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const HomeBanner = () => {
  return (
    <>
      <HomeAmbient />
      <main className="sandbox">
        <section className="sandbox__carousel">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
      </main>
    </>
  );
};

export default HomeBanner;
