import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/shadcn/alert-dialog";

import { MouseEvent, ReactNode, useEffect, useState } from "react";

interface ModalProps {
  title: string;
  message: string;
  dangerOption: string;
  cancelOption: string;
  dangerAction: (e: MouseEvent<HTMLButtonElement>) => void;
  cancelAction: () => void;
  showModal: boolean | null;
  icon: ReactNode;
}

export default function DangerModalT1({
  title,
  message,
  dangerOption,
  cancelOption,
  dangerAction,
  cancelAction,
  showModal,
  icon,
}: ModalProps) {
  const [open, setOpen] = useState(false);

  const handleDanger = (e: MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
    dangerAction(e);
  };

  const handleCancel = () => {
    setOpen(false);
    cancelAction();
  };

  useEffect(() => {
    if (showModal) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [showModal]);

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <AlertDialogContent className="dark:bg-[#232425] bg-[#fafcff]">
          <AlertDialogHeader>
            <div className="flex items-center text-3xl gap-2 dark:text-yellow-600 text-yellow-600">
              <p className="shadow-2xl shadow-amber-300">{icon}</p>
              <AlertDialogTitle>{title}</AlertDialogTitle>
            </div>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {cancelOption}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDanger}>
              {dangerOption}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogTrigger>
    </AlertDialog>
  );
}
