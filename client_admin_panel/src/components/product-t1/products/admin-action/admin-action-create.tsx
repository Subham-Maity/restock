import React from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import AddNewProductForm from "@/components/product-t1/create/product-form";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { Plus, Terminal } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/shadcn/alert";
import { Badge } from "@/components/ui/shadcn/badge";
import { useRouter } from "next/navigation";

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const plusVariants = {
  tap: { rotate: 20 },
};

const AdminActionCreate = () => {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className="inline-flex h-12  items-center justify-center rounded-md dark:bg-[linear-gradient(110deg,#222224,45%,#1e2631,55%,#2a2a2d)] dark:bg-[length:200%_100%] bg-[length:200%_100%] bg-[linear-gradient(110deg,#edeeef,45%,#a1a1a2,55%,#f9f9f9)]  dark:text-[#919eab] text-[#837c78] border border-gray-300/20 shadow-2xl rounded-lg px-6 font-medium text-slate-400 transition-colors focus:outline-none"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <motion.div variants={plusVariants}>
            <Plus className="mr-0.5" />
          </motion.div>
          Add New Product
        </motion.button>
      </DialogTrigger>
      <DialogContent className="w-full p-0 m-0 gap-0.5">
        <Alert className="dark:bg-[#28282b] bg-[#edeeef]">
          <Terminal className="h-4 w-4" />
          <AlertTitle> 🫡 Attention Admin!</AlertTitle>
          <AlertDescription>
            <Badge
              variant="default"
              className="mr-2 cursor-pointer"
              onClick={() => {
                router.push("/product-t1-add-form");
              }}
            >
              Click here
            </Badge>
            to see the enhanced version of our Add New Product form!
          </AlertDescription>
        </Alert>
        <ScrollArea className="h-[650px] p-0 m-0 w-full rounded-md border">
          <div className="flex flex-col">
            <AddNewProductForm />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AdminActionCreate;
