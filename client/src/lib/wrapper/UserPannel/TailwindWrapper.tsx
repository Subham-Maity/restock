import { ReactNode } from "react";
import { cn } from "@/lib/utils/utils";

const TailwindWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn("w-full h-full mt-20", className)}>{children}</div>;
};

export default TailwindWrapper;
