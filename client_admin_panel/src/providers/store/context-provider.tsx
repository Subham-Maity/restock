"use client";
import React, { useState } from "react";
import FormContext, {
  ContextDispatch,
  ContextState,
} from "@/store/context/context";

export interface InfoData {
  softCap: number;
}

export interface ProductData {
  title: string;
  description: string;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  price: number;
  stock: number;
  discountPercentage: number;
}

interface FormProviderProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [infoData, setInfoData] = useState<InfoData>({
    softCap: 0,
  });

  const [product, setProduct] = useState<ProductData>({
    // Use ProductDataInterface here
    title: "",
    description: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: ["", "", ""],
    price: 0,
    stock: 0,
    discountPercentage: 0,
  }); // Add this line

  const [isDarkTheme, setIsDarkTheme] = useState<Boolean>(false);
  const [openModal, setOpenModal] = useState<any>(false);
  const [isGrid, setIsGrid] = useState<Boolean>(true);
  const [prevPath, setPrevPath] = useState<string>("");
  const contextState: ContextState = {
    infoData,
    isDarkTheme,
    openModal,
    isGrid,
    prevPath, // Add this line
    product, // Add this line
  };

  const contextDispatch: ContextDispatch = {
    setInfoData,
    setIsDarkTheme,
    setOpenModal,
    setIsGrid,
    setPrevPath, // Add this line
    setProduct, // Add this line
  };

  return (
    <FormContext.Provider value={{ ...contextState, ...contextDispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export default ContextProvider;
