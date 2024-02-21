import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        green:
          "border-transparent dark:bg-green-800 bg-green-500 text-green-foreground shadow hover:bg-green-500/80 dark:hover:bg-green-800/80 dark:hover:text-green-foreground text-white",
        yellow:
          "border-transparent bg-yellow text-yellow-foreground shadow hover:bg-yellow/80 dark:hover:bg-yellow/80 dark:hover:text-yellow-foreground text-white dark:bg-yellow-800 dark:text-yellow-foreground",
        blue: "border-transparent bg-blue text-blue-foreground shadow hover:bg-blue/80 dark:bg-blue-800 dark:text-blue-foreground dark:hover:bg-blue-800/80 dark:hover:text-blue-foreground text-white",
        cyan: "border-transparent bg-cyan text-cyan-foreground shadow hover:bg-cyan/80 dark:bg-cyan-800 dark:text-cyan-foreground dark:hover:bg-cyan-800/80 dark:hover:text-cyan-foreground text-white",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
