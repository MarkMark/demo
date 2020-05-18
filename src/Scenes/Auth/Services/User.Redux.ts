import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUser } from "../../../@Types/Responses/User";
import { TAppState } from "../../../Services/Config/Store";

type TInitialState = Partial<IUser>;
const initialState: TInitialState = {
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      return { ...state, id: action.payload };
    },
  },
});

export const { setId } = userSlice.actions;
export const selectUser = (state: TAppState) => state.user;
export default userSlice.reducer;
