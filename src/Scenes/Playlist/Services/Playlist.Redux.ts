import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TAppState } from "../../../Services/Config/Store";

interface IInitialState {
  playlistData: IForm | null;
  tracks: any[];
}

interface IForm {
  name: string;
  description: string;
  private?: boolean;
}

const initialState: IInitialState = {
  playlistData: null,
  tracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylistData: (state, action: PayloadAction<IForm>) => {
      return { ...state, playlistData: action.payload };
    },
    setTrack: (state, action: PayloadAction<any>) => {
      return { ...state, tracks: [...state.tracks, action.payload] };
    },
  },
});

export const { setPlaylistData, setTrack } = playlistSlice.actions;
export const selectPlaylist = (state: TAppState) => state.playlist;
export default playlistSlice.reducer;
