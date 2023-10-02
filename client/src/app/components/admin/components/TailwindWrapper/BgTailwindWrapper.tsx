import { ReactNode } from "react";
import { cn } from "@/lib/utils/utils";

const BgAdminTailwindWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        " dark:bg-[#2b2d30] bg-stone-200/25 lg:border lg:dark:border-white/25 rounded-lg p-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BgAdminTailwindWrapper;
