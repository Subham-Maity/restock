import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { LargeGridController } from "@/components/product-t1/grid/grid-control";

const GridLargeViewSkeleton = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const loader = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [items]);

  const handleObserver = (entities: any[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setItems((prev) => [...prev, ...Array.from({ length: 20 })]);
    }
  };

  return (
    <div className={LargeGridController}>
      {items.map((_, index) => (
        <div key={index} className="default-card rounded-lg overflow-hidden">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <div className="w-full h-full">
              <Skeleton className="w-full h-full object-fill object-center dark:bg-[#343438] bg-white" />
            </div>
          </div>
          <div className="mb-6 mt-2">
            <Skeleton className="text-xl w-[200px] h-[20px]" />
            <Skeleton className="text-base w-[100px] h-[20px]" />
          </div>
        </div>
      ))}
      <div className="loading" ref={loader}>
        <Skeleton className="rounded-lg mx-12 w-[300px] h-[400px]" />
      </div>
    </div>
  );
};

export default GridLargeViewSkeleton;
