import React, { Fragment, useEffect, useState } from "react";

import Playlist from "../Playlist/Playlist";
import Search from "../Search/Search";
import { setId } from "./Services/User.Redux";
import { setToken } from "./Services/Auth.Redux";
import { useDispatch } from "react-redux";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "821d49a1de184a378e845316ab86f438";
const redirectUri = "http://localhost:3000/";
const scopes = ["playlist-modify-public", "user-read-private"];

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial: any, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

export default function Login() {
  const [token] = useState(hash.access_token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));

      fetch(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((res) => dispatch(setId(res.id)))
        .catch((err) => console.error(err));
    }
  }, [dispatch, token]);

  return (
    <div>
      {!token && (
        <a
          className="btn btn--loginApp-link"
          href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            ","
          )}&response_type=token`}
        >
          Login to Spotify
        </a>
      )}

      {token && (
        <Fragment>
          <Search token={token} />
          <Playlist />
        </Fragment>
      )}
    </div>
  );
}
