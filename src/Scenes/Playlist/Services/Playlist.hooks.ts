import { selectAuth } from "../../Auth/Services/Auth.Redux";
import { selectPlaylist } from "./Playlist.Redux";
import { selectUser } from "../../Auth/Services/User.Redux";
import { useSelector } from "react-redux";

export function usePlaylist() {
  const { token } = useSelector(selectAuth);
  const { id } = useSelector(selectUser);
  const { playlistData, tracks } = useSelector(selectPlaylist);

  const exportPlaylist = async () => {
    // [1] Create playlist
    if (playlistData) {
      fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(playlistData),
      })
        .then((response) => response.json())
        .then((res) => {
          const { id } = res;
          const tracksMap = tracks.map((track) => track.uri);

          // [2] Add songs to playlist
          fetch(
            `https://api.spotify.com/v1/playlists/${id}/tracks?uris=${tracksMap.join(
              ","
            )}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              method: "POST",
            }
          );
        });
    }
  };

  return { playlistData, tracks, exportPlaylist };
}
