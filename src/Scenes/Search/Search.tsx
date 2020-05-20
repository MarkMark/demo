import {
  selectPlaylist,
  setIsAddPlaylistOpen,
} from "./Services/Playlist.Redux";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "../../Components/Layout/Box";
import FormPlaylist from "./Components/FormPlaylist";
import { Input } from "rendition";
import PlaylistSidebar from "./Components/PlaylistSidebar";
import React from "react";
import { selectAuth } from "../Auth/Services/Auth.Redux";
import { useHistory } from "react-router-dom";
import { usePlaylist } from "./Services/Playlist.hooks";
import { useSearch } from "./Services/Search.hooks";

export default function Search() {
  const {
    searchValue,
    tracks,
    setSearchValue,
    hasError,
    isSearching,
  } = useSearch();
  const { playlistData, setTrack } = usePlaylist();
  const { isAddPlaylistOpen } = useSelector(selectPlaylist);
  const { token } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   if (!token) history.push("/");
  // }, [history, token]);

  return (
    <Box display="flex">
      <Box padding="32px" flex="1">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="search"
          mb="16px"
        />

        {(() => {
          if (isSearching) return "Loading";

          if (hasError) return "Unable to return the list at this time";

          if (tracks.length)
            return tracks.map((track, i) => (
              <Box
                key={track.id ?? i}
                display="flex"
                justifyContent="space-between"
              >
                {track.name}
                {/* TODO: Check that a playlist exists */}
                <button
                  onClick={() => {
                    if (!playlistData) {
                      dispatch(setIsAddPlaylistOpen(true));
                    }
                    console.log(track);

                    setTrack(track);
                  }}
                >
                  add to playlist
                </button>
              </Box>
            ));
        })()}
      </Box>

      <PlaylistSidebar />

      {isAddPlaylistOpen && <FormPlaylist />}
    </Box>
  );
}
