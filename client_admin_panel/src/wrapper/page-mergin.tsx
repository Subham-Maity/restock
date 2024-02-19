import { ReactNode } from "react";
import { cn } from "@/utils/tw-merge/tw";

const PageMergin = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn("lg:mt-28 mt-20", className)}>{children}</div>;
};

export default PageMergin;
