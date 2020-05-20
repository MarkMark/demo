import {
  selectSearch,
  setHasError,
  setIsSearching,
  setSearchValue,
  setTracks,
} from "./Search.Redux";
import { useDispatch, useSelector } from "react-redux";

import spotifyApi from "../../../Services/Config/spotify";
import { useDebounce } from "../../../Services/Hooks/useDebounce";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export function useSearch() {
  const { searchValue, isSearching, tracks, hasError } = useSelector(
    selectSearch
  );
  const debouncedSearchValue = useDebounce(searchValue, 250);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(setHasError(false));

    if (debouncedSearchValue) {
      dispatch(setIsSearching(true));

      spotifyApi
        .searchTracks(debouncedSearchValue)
        .then((res) => dispatch(setTracks(res.tracks.items ?? [])))
        .catch((err) => {
          console.error(err);
          dispatch(setHasError(true));
          localStorage.removeItem("token");
          history.push("/login");
        })
        .finally(() => dispatch(setIsSearching(false)));
    } else {
      dispatch(setIsSearching(false));
      dispatch(setTracks([]));
    }
  }, [debouncedSearchValue, dispatch, history]);

  return {
    searchValue,
    setSearchValue: (value: string) => dispatch(setSearchValue(value)),
    isSearching,
    hasError,
    tracks,
  };
}
