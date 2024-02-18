import React, { useContext } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import Context from "@/store/context/context";

import { useEffect } from "react";

const ReactHotToast = () => {
  const { isDarkTheme } = useContext(Context);
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);
  return (
    <div>
      <Toaster
        toastOptions={{
          error: {
            style: {
              background: isDarkTheme ? "#232c37" : "#fff",
              color: isDarkTheme ? "#fff" : "#000",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default ReactHotToast;
