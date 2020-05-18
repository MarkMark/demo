import React from "react";
import { setTrack } from "../Playlist/Services/Playlist.Redux";
import { useDispatch } from "react-redux";
import { useSearch } from "./Services/Search.hooks";

interface ISearch {
  token: string;
}

export default function Search({ token }: ISearch) {
  const { searchValue, tracks, setSearchValue } = useSearch(token);
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {!!tracks.length &&
        tracks.map((track, i) => (
          <div key={track.id ?? i}>
            {/* TODO: Check that a playlist exists */}
            <button onClick={() => dispatch(setTrack(track))}>
              {track.name}
            </button>
          </div>
        ))}
    </div>
  );
}
