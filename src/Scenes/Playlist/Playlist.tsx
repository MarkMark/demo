import FormPlaylist from "./FormPlaylist";
import React from "react";
import { usePlaylist } from "./Services/Playlist.hooks";

export default function Playlist() {
  const { playlistData, tracks, exportPlaylist } = usePlaylist();

  return (
    <div>
      <h6>Create a playlist</h6>

      {(() => {
        if (playlistData)
          return (
            <div style={{ width: "200px", minHeight: "200px" }}>
              <div>{playlistData.name}</div>

              {tracks.map((track, i) => (
                <div key={track.uri ?? i}>{track.name}</div>
              ))}

              <div>
                <button onClick={exportPlaylist}>export to spotify</button>
              </div>
            </div>
          );
      })()}

      <FormPlaylist />
    </div>
  );
}
