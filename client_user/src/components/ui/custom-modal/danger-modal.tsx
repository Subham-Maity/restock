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
} from "@/components/ui/shad-cn/alert-dialog";
import { MouseEvent, ReactNode, useEffect, useState } from "react"; // Import ReactNode

interface ModalProps {
  title: string;
  message: string;
  dangerOption: string;
  cancelOption: string;
  dangerAction: (e: MouseEvent<HTMLButtonElement>) => void;
  cancelAction: () => void;
  showModal: boolean | null;
  icon: ReactNode; // Add icon prop
}

export default function DangerModal({
  title,
  message,
  dangerOption,
  cancelOption,
  dangerAction,
  cancelAction,
  showModal,
  icon, // Destructure icon prop
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
        <AlertDialogContent>
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
