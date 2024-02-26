import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@nextui-org/react";

const GridListViewSkeleton = () => {
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
    <div>
      {items.map((_, index) => (
        <div key={index} className="rounded-lg mt-5">
          <Skeleton className="rounded-lg w-full h-[200px] sm:h-[280px]" />
        </div>
      ))}
      <div className="loading" ref={loader}>
        <Skeleton className="rounded-lg mx-12 w-full h-[200px] sm:h-[280px]" />
      </div>
    </div>
  );
};

export default GridListViewSkeleton;
