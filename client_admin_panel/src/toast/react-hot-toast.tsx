import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import Context from "@/store/context/context";

const ReactHotToast = () => {
  const { isDarkTheme } = useContext(Context);
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
