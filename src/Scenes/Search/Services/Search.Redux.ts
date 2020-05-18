import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TAppState } from "../../../Services/Config/Store";

interface IInitialState {
  searchValue: string;
  isSearching: boolean;
  tracks: any[];
}

const initialState: IInitialState = {
  searchValue: "",
  isSearching: false,
  tracks: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      return { ...state, searchValue: action.payload };
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      return { ...state, isSearching: action.payload };
    },
    setTracks: (state, action: PayloadAction<unknown[]>) => {
      return { ...state, tracks: action.payload };
    },
  },
});

export const {
  setSearchValue,
  setIsSearching,
  setTracks,
} = searchSlice.actions;
export const selectSearch = (state: TAppState) => state.search;
export default searchSlice.reducer;
