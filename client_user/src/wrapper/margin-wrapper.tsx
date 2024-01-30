import {ReactNode} from "react";
import {cn} from "@/utils/tw-merge/tw";

const MarginWrapper = ({
                           className,
                           children,
                       }: {
    className?: string;
    children: ReactNode;
}) => {
    return <div className={cn("w-full h-full mt-20", className)}>{children}</div>;
};

export default MarginWrapper;
