import {
  selectSearch,
  setIsSearching,
  setSearchValue,
  setTracks,
} from "./Search.Redux";
import { useDispatch, useSelector } from "react-redux";

import { useDebounce } from "../../../Services/Hooks/useDebounce";
import { useEffect } from "react";

export function useSearch(token: string) {
  const { searchValue, isSearching, tracks } = useSelector(selectSearch);
  const debouncedSearchValue = useDebounce(searchValue, 250);
  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedSearchValue) {
      fetch(
        `https://api.spotify.com/v1/search?q=${debouncedSearchValue}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => dispatch(setTracks(res.tracks.items ?? [])))
        .catch((err) => console.error(err))
        .finally(() => dispatch(setIsSearching(false)));
    } else {
      dispatch(setIsSearching(false));
      dispatch(setTracks([]));
    }
  }, [debouncedSearchValue, dispatch, token]);

  // const spotify = new SpotifyWebApi();
  // const dispatch = useDispatch();
  // spotify.setAccessToken(token);

  // const search = function (value: string) {
  //   fetch(`https://api.spotify.com/v1/search?q=${value}&type=track`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then(({ tracks }) => dispatch(setTracks(tracks.items)));
  //   // spotify
  //   //   .searchTracks(value, { limit: 5 })
  //   //   .then(({ tracks }) => setTracks(() => tracks.items));
  // };

  return {
    searchValue,
    setSearchValue: (value: string) => dispatch(setSearchValue(value)),
    isSearching,
    tracks,
  };
}
