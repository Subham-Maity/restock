import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel";
import { type CarouselApi } from "@/components/ui/shadcn/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export function CustomCardT2({
  product,
  className,
  height,
  width,
  href,
}: {
  product: any;
  className: string;
  height: number;
  width: number;
  href?: string;
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = React.useState(false);
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const images = [product.thumbnail, ...product.images];

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Carousel
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      plugins={isHovered ? [Autoplay({ delay: 2000 })] : []}
      className="w-full max-w-xs relative group"
      setApi={setApi}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              src={image}
              alt={product.title}
              className={className}
              height={height}
              width={width}
              unoptimized
              onClick={() => {
                router.push(href || "#");
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {api?.canScrollPrev() && (
        <CarouselPrevious
          className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-white text-black rounded-full ${
            isHovered ? "opacity-100" : "opacity-0"
          } hover:bg-black/5 transition-opacity duration-200 ease-in-out border-none`}
        />
      )}
      {api?.canScrollNext() && (
        <CarouselNext
          className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-white text-black rounded-full ${
            isHovered ? "opacity-100" : "opacity-0"
          } hover:bg-black/5 transition-opacity duration-200 ease-in-out border-none`}
        />
      )}
    </Carousel>
  );
}
