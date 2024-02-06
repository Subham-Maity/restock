"use client";
import React, { useState } from "react";
import FormContext, {
  ContextDispatch,
  ContextState,
} from "@/store/context/context";

export interface InfoData {
  softCap: number;
}

interface FormProviderProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [infoData, setInfoData] = useState<InfoData>({
    softCap: 0,
  });

  const [isDarkTheme, setIsDarkTheme] = useState<Boolean>(false);

  const [isGrid, setIsGrid] = useState<Boolean>(true);
  const [prevPath, setPrevPath] = useState<string>("");
  const contextState: ContextState = {
    infoData,
    isDarkTheme,
    isGrid,
    prevPath, // Add this line
  };

  const contextDispatch: ContextDispatch = {
    setInfoData,
    setIsDarkTheme,
    setIsGrid,
    setPrevPath, // Add this line
  };

  return (
    <FormContext.Provider value={{ ...contextState, ...contextDispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export default ContextProvider;
