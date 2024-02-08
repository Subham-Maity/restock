"use client";
import React, { CSSProperties, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ImCross } from "react-icons/im";
import { useRouter } from "next/navigation";

export default function HeadlessModal({
  children,
  onClose = true,
  bgClass = "dark:bg-stone-800 bg-gray-400/25 p-4 rounded-xl",
  buttonClass = "mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white",
}: {
  children: React.ReactNode;
  onClose?: boolean;
  bgClass?: string;
  buttonClass?: string;
}) {
  const router = useRouter();
  const handleClose = () => {
    if (onClose) {
      router.back();
    }
  };

  const closeButtonStyle: CSSProperties = {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: 1000,
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-10 ${bgClass}`}
        onClose={handleClose}
      >
        {onClose && (
          <button
            onClick={handleClose}
            className={buttonClass}
            style={closeButtonStyle}
          >
            <ImCross className="h-6 w-6" />
          </button>
        )}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-y-auto rounded-2xl bg-gradient-to-r from-slate-900 flex items-center to-stone-700 text-left shadow-xl transition-all w-full h-2/3 md:w-2/3 xl:w-1/3 p-4">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
