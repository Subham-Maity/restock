"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"; // Import memo and useCallback
import { motion } from "framer-motion";

type Props = {
  title?: string;
  onClose?: () => void;
  onOk?: () => void;
  children: ReactNode;
  bg?: boolean;
  bgClass?: string;
  buttonClass?: string;
  animation?: boolean;
};

const Dialog = ({
  title,
  onClose,
  onOk,
  children,
  bg = true,
  bgClass = "",
  buttonClass = "",
  animation = true,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = useMemo(
    () => searchParams.get("showDialog"),
    [searchParams],
  );

  const closeDialog = useCallback(() => {
    // Use useCallback
    dialogRef.current?.close();
    router.back();
    onClose && onClose();
  }, [router, onClose]);

  const clickOk = useCallback(() => {
    // Use useCallback
    onOk && onOk();
    closeDialog();
  }, [onOk, closeDialog]);

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const dialogClass = useMemo(() => {
    // Use useMemo
    return bg
      ? `fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-xl backdrop:bg-gray-800/50  bg-transparent ${bgClass}`
      : `fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-xl`;
  }, [bg, bgClass]);

  return showDialog === "y" ? (
    animation ? (
      <motion.dialog
        ref={dialogRef}
        className={dialogClass}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="w-full max-w-full flex flex-col">
          <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-transparent">
            {title && <h1 className="text-2xl">{title}</h1>}
            {onClose && (
              <motion.button
                onClick={closeDialog}
                className={`mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold ${buttonClass}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                x
              </motion.button>
            )}
          </div>
          <div>
            {children}
            {onOk && (
              <div className="flex flex-row justify-end mt-2">
                <motion.button
                  onClick={clickOk}
                  className={`py-1 px-2 rounded border-none ${buttonClass}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  OK
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.dialog>
    ) : (
      <dialog ref={dialogRef} className={dialogClass}>
        <div className="w-full max-w-full flex flex-col">
          <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-transparent">
            {title && <h1 className="text-2xl">{title}</h1>}
            {onClose && (
              <button
                onClick={closeDialog}
                className={`mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold ${buttonClass}`}
              >
                x
              </button>
            )}
          </div>
          <div className="px-5 pb-6">
            {children}
            {onOk && (
              <div className="flex flex-row justify-end mt-2">
                <button
                  onClick={clickOk}
                  className={`py-1 px-2 rounded border-none ${buttonClass}`}
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    )
  ) : null;
};

export default memo(Dialog);
