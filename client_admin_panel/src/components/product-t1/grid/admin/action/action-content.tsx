"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/shadcn/alert";
import { Terminal } from "lucide-react";
import { Badge } from "@/components/ui/shadcn/badge";
import { Dialog, DialogContent } from "@/components/ui/shadcn/dialog";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { useRouter } from "next/navigation";
import UpdateProductForm from "@/components/product-t1/operation/product/update/product-form";
import { useAppSelector } from "@/store/redux/useSelector";
import { selectProductById } from "@/lib/features/product/product-pc-slice";
import { REDIRECT_TO_THE_PRODUCT_UPDATE_UPDATE } from "@/links/product-update";

const ActionContent = () => {
  const router = useRouter();
  const selectedProduct = useAppSelector(selectProductById);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full p-0 m-0 gap-0.5">
        <Alert className="dark:bg-[#28282b] bg-[#edeeef]">
          <Terminal className="h-4 w-4" />
          <AlertTitle> 🫡 Attention Admin!</AlertTitle>
          <AlertDescription>
            <Badge
              variant="default"
              className="mr-2 cursor-pointer"
              onClick={() => {
                router.push(
                  REDIRECT_TO_THE_PRODUCT_UPDATE_UPDATE + selectedProduct?.id,
                );
              }}
            >
              Click here
            </Badge>
            to see the enhanced version of our Update Product form!
          </AlertDescription>
        </Alert>
        <ScrollArea className="h-[650px] p-0 m-0 w-full rounded-md border">
          <div className="flex flex-col">
            <UpdateProductForm />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ActionContent;
