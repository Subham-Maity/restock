import image1 from "../../../../../public/BannerPoster/1.jpg";
import image2 from "../../../../../public/BannerPoster/2.jpg";
import image3 from "../../../../../public/BannerPoster/3.jpg";
import image4 from "../../../../../public/BannerPoster/4.jpg";
import image5 from "../../../../../public/BannerPoster/5.jpg";
import image6 from "../../../../../public/BannerPoster/6.jpg";
import { StaticImageData } from "next/image";

export const images: StaticImageData[] = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
];

const imageByIndex = (index: number) => images[index % images.length];

export default imageByIndex;
