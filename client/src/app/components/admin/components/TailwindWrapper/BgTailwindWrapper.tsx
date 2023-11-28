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
        "dark:bg-[#2b313a] bg-stone-200/25 rounded-lg p-4 z-10 shadow-md shadow-black/25 opacity-95 w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BgAdminTailwindWrapper;
