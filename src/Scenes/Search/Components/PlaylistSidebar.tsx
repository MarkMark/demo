import { Box, Button } from "rendition";

import React from "react";
import { setIsAddPlaylistOpen } from "../Services/Playlist.Redux";
import { useDispatch } from "react-redux";
import { usePlaylist } from "../Services/Playlist.hooks";

export default function PlaylistSidebar() {
  const {
    playlistData,
    tracks,
    exportPlaylist,
    isLoading,
    isUploaded,
  } = usePlaylist();
  const dispatch = useDispatch();

  return (
    <Box padding="32px">
      <Box mb="16px">
        {(() => {
          if (playlistData) return <h3>{playlistData.name} playlist</h3>;

          return (
            <Button
              disabled={isLoading || isUploaded}
              onClick={() => dispatch(setIsAddPlaylistOpen(true))}
            >
              Create a playlist
            </Button>
          );
        })()}
      </Box>

      {!!tracks.length &&
        tracks.map((track, i) => (
          <Box key={track.id ?? i} mb="8px">
            {track.name}
          </Box>
        ))}

      <Button
        primary
        disabled={!playlistData || !tracks.length}
        onClick={exportPlaylist}
      >
        export
      </Button>
    </Box>
  );
}
