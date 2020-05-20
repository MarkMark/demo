import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TAppState } from "../../../Services/Config/Store";

interface IInitialState {
  playlistData: IForm | null;
  tracks: SpotifyApi.TrackObjectFull[];
  isAddPlaylistOpen: boolean;
  isUploaded: boolean;
  isLoading: boolean;
  hasError: boolean;
}

export interface IForm {
  name: string;
  description: string;
  private?: boolean;
}

export const initialState: IInitialState = {
  playlistData: null,
  tracks: [],
  isAddPlaylistOpen: false,
  isUploaded: false,
  isLoading: false,
  hasError: false,
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
    setHasError: (state, action: PayloadAction<boolean>) => {
      return { ...state, hasError: action.payload };
    },
    setIsUploaded: (state, action: PayloadAction<boolean>) => {
      return { ...state, isUploaded: action.payload };
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },
    setTrack: (state, action: PayloadAction<SpotifyApi.TrackObjectFull>) => {
      return { ...state, tracks: [...state.tracks, action.payload] };
    },
  },
});

export const {
  setPlaylistData,
  setIsAddPlaylistOpen,
  setIsUploaded,
  setIsLoading,
  setHasError,
  setTrack,
} = playlistSlice.actions;
export const selectPlaylist = (state: TAppState) => state.playlist;
export default playlistSlice.reducer;
