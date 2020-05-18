import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TAppState } from "../../../Services/Config/Store";

interface IInitialState {
  playlistData: IForm | null;
  tracks: SpotifyApi.TrackObjectFull[];
  isAddPlaylistOpen: boolean;
}

interface IForm {
  name: string;
  description: string;
  private?: boolean;
}

const initialState: IInitialState = {
  playlistData: null,
  tracks: [],
  isAddPlaylistOpen: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylistData: (state, action: PayloadAction<IForm>) => {
      return { ...state, playlistData: action.payload };
    },
    setIsAddPlaylistOpen: (state, action: PayloadAction<boolean>) => {
      return { ...state, isAddPlaylistOpen: action.payload };
    },
    setTrack: (state, action: PayloadAction<SpotifyApi.TrackObjectFull>) => {
      return { ...state, tracks: [...state.tracks, action.payload] };
    },
  },
});

export const {
  setPlaylistData,
  setIsAddPlaylistOpen,
  setTrack,
} = playlistSlice.actions;
export const selectPlaylist = (state: TAppState) => state.playlist;
export default playlistSlice.reducer;
