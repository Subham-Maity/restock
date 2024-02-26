import { cn } from "@/utils/tw-merge/tw";
import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { AlertDialog } from "@/components/ui/shadcn/alert-dialog";

interface DangerDialogProps {
  trigger: React.ReactNode;
  Icon: React.ReactElement;
  bgModal?: string;
  titleTextClass?: string;
  descriptionTextClass?: string;
  title: string;
  buttonText: string;
  description: string;
  buttonClass?: string;
  buttonType?: "button" | "submit" | "reset";
  onClick: () => void;
}

const DangerDialog: React.FC<DangerDialogProps> = ({
  trigger,
  Icon,
  bgModal = "dark:bg-[#232425] bg-[#fafcff]",
  titleTextClass = "dark:text-red-600 text-red-500",
  descriptionTextClass = "mt-2 mb-4 text-sm dark:text-[#7b8696] text-black/75",
  title,
  buttonText,
  description,
  buttonClass,
  buttonType = "button",
  onClick,
}) => (
  <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>

    <DialogContent className="w-full p-0 m-0">
      <AlertDialog>
        <div className={cn("p-6 rounded-lg", bgModal)}>
          <div className="flex items-center text-md font-bold">
            {Icon}
            <span className="sr-only">Info</span>
            <h3 className={cn("font-medium", titleTextClass)}>{title}</h3>
          </div>
          <div className={cn(descriptionTextClass)}>{description}</div>
          <div className="flex">
            <Button
              variant="default"
              type={buttonType}
              className={buttonClass}
              onClick={onClick}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </AlertDialog>
    </DialogContent>
  </Dialog>
);

export default DangerDialog;
