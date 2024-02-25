"use client";
import React from "react";

export interface InfoData {
  softCap: number;
}

export interface ProductDataInterface {
  id?: string;
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

export interface ContextState {
  infoData: InfoData;
  isDarkTheme: Boolean;
  openModal: any;
  isGrid: Boolean;
  prevPath: string;
  product: ProductDataInterface;
}

export interface ContextDispatch {
  setInfoData: React.Dispatch<React.SetStateAction<InfoData>>;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<Boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<Boolean>>;
  setIsGrid: React.Dispatch<React.SetStateAction<Boolean>>;
  setPrevPath: React.Dispatch<React.SetStateAction<string>>;
  setProduct: React.Dispatch<React.SetStateAction<ProductDataInterface>>;
}

type ContextProps = ContextState & ContextDispatch;

const defaultInfoData: InfoData = {
  softCap: 0,
};
const defaultProductData: ProductDataInterface = {
  title: "",
  description: "",
  brand: "",
  category: "",
  thumbnail: "",
  images: ["", "", ""],
  price: 0,
  stock: 0,
  discountPercentage: 0,
};
const defaultDispatch: ContextDispatch = {
  setInfoData: () => {},
  setIsDarkTheme: () => {},
  setOpenModal: () => {},
  setIsGrid: () => {},
  setPrevPath: () => {},
  setProduct: () => {},
};

const defaultFormContext: ContextProps = {
  ...defaultDispatch,
  infoData: defaultInfoData,
  isDarkTheme: false,
  openModal: false,
  isGrid: true,
  prevPath: "",
  product: defaultProductData,
};

const Context = React.createContext<ContextProps>(defaultFormContext);

export default Context;
