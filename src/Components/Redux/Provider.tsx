import { AnyAction, Store } from "@reduxjs/toolkit";
import React, { ReactElement } from "react";

import { Provider } from "react-redux";

interface IProviderRedux {
  children: ReactElement;
  store: Store<any, AnyAction>;
}

export const ProviderRedux = ({ children, store }: IProviderRedux) => (
  <Provider store={store}>{children}</Provider>
);
