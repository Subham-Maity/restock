import { ReactNode } from "react";
import { cn } from "@/utils/tw-merge/tw";

const MarginWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn("", className)}>{children}</div>;
};

export default MarginWrapper;
