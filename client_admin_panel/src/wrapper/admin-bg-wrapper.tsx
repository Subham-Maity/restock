import { ReactNode } from "react";
import { cn } from "@/utils/tw-merge/tw";

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
        "dark:bg-[#2b313a] bg-stone-200/25 rounded-lg p-4 shadow-md shadow-black/25 opacity-95 w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BgAdminTailwindWrapper;
