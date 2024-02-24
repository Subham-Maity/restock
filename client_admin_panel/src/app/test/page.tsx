"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import AddNewProductForm from "@/components/product-t1/create/product/product-form";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";

export default function AdminActionCreate() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="mt-32">Button 1</button>
      </DialogTrigger>
      <DialogContent className="w-full p-0 m-0">
        <ScrollArea className="h-[800px] w-full rounded-md border">
          <div className="flex flex-col">
            <AddNewProductForm />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
