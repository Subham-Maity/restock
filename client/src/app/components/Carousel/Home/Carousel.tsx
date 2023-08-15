import Image from "next/image";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Image {
  id: number;
  src: string;
  alt: string;
  href?: string;
}

const settings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4500,
  initialSlide: 0,
  cssEase: "linear",
};
// Define a constant array of image data


const Carousel:React.FC<Image> = ({id, src, alt, href}) => {
  const router = useRouter();
  return (
    <div className="object-cover mx-auto rounded-2xl">
      <div className="lg:mx-40">
        <div className="flex items-center justify-center">
          <div className="justify-center">
            <div>
              <div className="grid grid-cols-1 gap-4 max-w-full h-auto rounded-lg overflow-hidden mt-4">
                <div style={{ overflow: "hidden", padding: "2px 30px 45px" }}>
                  <Slider {...settings}>
                    {src.map((image, index) => {
                      return (
                        <>
                          <div
                            key={image.id}
                            className="flex items-center justify-center relative"
                          >
                            <Image
                              className={`object-cover lg:min-h-full lg:min-w-full hover:scale-[1.05] hover:rounded-2xl rounded-2xl transiton-all ease-in-out duration-500`}
                              onClick={() => {
                                if (image.href != null) {
                                  router.push(image.href);
                                }
                              }}
                              src={image.src}
                              alt={image.alt}
                              width={500}
                              height={500}
                              layout="intrinsic"
                              objectFit="cover"
                            />
                          </div>
                        </>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
