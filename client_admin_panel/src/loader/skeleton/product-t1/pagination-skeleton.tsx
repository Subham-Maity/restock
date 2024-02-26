import React from "react";
import { Skeleton } from "@nextui-org/react";

const PaginationSkeleton = () => {
  return (
    <div>
      <Skeleton className="rounded-lg w-full h-6" />
    </div>
  );
};

export default PaginationSkeleton;
