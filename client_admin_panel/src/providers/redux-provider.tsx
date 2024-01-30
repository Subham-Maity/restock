"use client";
import { store } from "@/store/redux/store";
import React from "react";

/* Core */
import { Provider } from "react-redux";

/* Instruments */

export const ReduxProvider = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};
