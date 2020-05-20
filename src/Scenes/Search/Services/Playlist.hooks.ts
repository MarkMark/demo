import {
  IForm,
  selectPlaylist,
  setHasError,
  setIsLoading,
  setIsUploaded,
  setPlaylistData,
  setTrack,
} from "./Playlist.Redux";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../../Auth/Services/User.Redux";
import spotifyApi from "../../../Services/Config/spotify";
import { toast } from "react-toastify";

export function usePlaylist() {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUser);
  const { playlistData, tracks, hasError, isUploaded, isLoading } = useSelector(
    selectPlaylist
  );
  const exportPlaylist = async () => {
    dispatch(setIsLoading(true));
    dispatch(setHasError(false));
    dispatch(setIsUploaded(false));

    if (playlistData) {
      // [1] Create playlist
      spotifyApi
        .createPlaylist(id ?? "", {
          ...playlistData,
        })
        .then(({ id: playlistID }) => {
          // [2] Save the tracks
          spotifyApi
            .addTracksToPlaylist(
              playlistID,
              tracks.map((track) => track.uri)
            )
            .then(() => {
              toast("Uploaded playlist to spotify");
              dispatch(setIsUploaded(true));
            })
            .catch((err) => {
              console.error(err);
              toast("We couldnt add the tracks at this time");
              dispatch(setHasError(true));
            });
        })
        .catch((err) => {
          console.error(err);
          toast("We couldnt create a playlist at this time");
          dispatch(setHasError(true));
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  };

  return {
    playlistData,
    tracks,
    exportPlaylist,
    isUploaded,
    isLoading,
    hasError,
    setTrack: (track: SpotifyApi.TrackObjectFull) => dispatch(setTrack(track)),
    setPlaylistData: (data: IForm) => dispatch(setPlaylistData(data)),
  };
}
