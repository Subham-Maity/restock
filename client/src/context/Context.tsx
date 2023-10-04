import React from "react";

export interface InfoData {
  softCap: number;
}

export interface ContextState {
  infoData: InfoData;
}

export interface ContextDispatch {
  setInfoData: React.Dispatch<React.SetStateAction<InfoData>>;
}

type ContextProps = ContextState & ContextDispatch;

const defaultInfoData: InfoData = {
  softCap: 0,
};

const defaultDispatch: ContextDispatch = {
  setInfoData: () => {},
};

const defaultFormContext: ContextProps = {
  ...defaultDispatch,
  infoData: defaultInfoData,
};

const Context = React.createContext<ContextProps>(defaultFormContext);

export default Context;
