import { configureStore } from "@reduxjs/toolkit";
import reducerAuth from "../../Scenes/Auth/Services/Auth.Redux";
import reducerPlaylist from "../../Scenes/Search/Services/Playlist.Redux";
import reducerSearch from "../../Scenes/Search/Services/Search.Redux";
import reducerUser from "../../Scenes/Auth/Services/User.Redux";

const store = configureStore({
  reducer: {
    search: reducerSearch,
    user: reducerUser,
    auth: reducerAuth,
    playlist: reducerPlaylist,
  },
});

export default store;
export type TAppState = ReturnType<typeof store.getState>;
