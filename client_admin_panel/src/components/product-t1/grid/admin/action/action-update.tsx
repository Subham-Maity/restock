import React from "react";
import { Badge } from "@/components/ui/shadcn/badge";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import { motion } from "framer-motion";

interface Props {
  href: string;
  className?: string;
}

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const plusVariants = {
  tap: { rotate: -20 },
};
const ActionUpdate: React.FC<Props> = ({ href, className }) => {
  const router = useRouter();
  return (
    <div className={`px-2 ${className}`}>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => {
          router.push(href);
        }}
      >
        <Badge variant="cyan">
          <motion.div variants={plusVariants}>
            <Pencil className="mr-2 h-4 " />
          </motion.div>
          Edit Product
        </Badge>
      </motion.button>
    </div>
  );
};

export default ActionUpdate;
