import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TAppState } from "../../../Services/Config/Store";

interface IInitialState {
  token: string;
}

const initialState: IInitialState = {
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      return { ...state, token: action.payload };
    },
  },
});

export const { setToken } = authSlice.actions;
export const selectAuth = (state: TAppState) => state.auth;
export default authSlice.reducer;
