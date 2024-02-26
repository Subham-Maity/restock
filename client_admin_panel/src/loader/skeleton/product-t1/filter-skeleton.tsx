import React from "react";
import { Skeleton } from "@nextui-org/react";

const FilterSkeleton = () => {
  const defaultFilter = 5;
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: defaultFilter }).map((_, index) => (
        <div key={index} className="mb-2">
          <Skeleton className="text-xl w-[200px] mb-2 h-[20px]" />
          <Skeleton className="text-base w-[100px] h-[20px]" />
        </div>
      ))}
    </div>
  );
};

export default FilterSkeleton;
