"use client";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/shadcn/alert-dialog";
import React, { CSSProperties, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

interface ModalProps {
  children: React.ReactNode;
  onClose?: boolean;
  bgClass?: string;
  buttonClass?: string;
}

export default function RouteModalShadcn({
  children,
  onClose = true,
  bgClass = "dark:bg-stone-800 bg-gray-400/25 p-4 rounded-xl",
  buttonClass = "mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white",
}: ModalProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    if (onClose) {
      setOpen(false);
    }
  };

  const closeButtonStyle: CSSProperties = {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: 1000,
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className={`relative z-10 ${bgClass}`}>
        {onClose && (
          <button
            onClick={handleClose}
            className={buttonClass}
            style={closeButtonStyle}
          >
            <ImCross className="h-6 w-6" />
          </button>
        )}
        <div style={{ maxHeight: "100vh", overflowY: "auto" }}>{children}</div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
