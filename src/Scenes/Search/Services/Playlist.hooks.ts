import { selectPlaylist } from "./Playlist.Redux";
import { selectUser } from "../../Auth/Services/User.Redux";
import spotifyApi from "../../../Services/Config/shopify";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export function usePlaylist() {
  const { id } = useSelector(selectUser);
  const { playlistData, tracks } = useSelector(selectPlaylist);
  const exportPlaylist = async () => {
    // [1] Create playlist
    if (playlistData) {
      const { id: playlistID } = await spotifyApi.createPlaylist(id ?? "", {
        ...playlistData,
      });

      // [2] Save the tracks
      spotifyApi
        .addTracksToPlaylist(
          playlistID,
          tracks.map((track) => track.uri)
        )
        .then(() => toast("Uploaded playlist to spotify"))
        .catch((err) => {
          console.error(err);
          toast("We couldnt add the tracks at this time");
        });
    }
  };

  return { playlistData, tracks, exportPlaylist };
}
