import React, { useEffect } from "react";

import { Box } from "../../Components/Layout/Box";
import { Link } from "rendition";
import { setId } from "./Services/User.Redux";
import { setToken } from "./Services/Auth.Redux";
import spotifyApi from "../../Services/Config/shopify";
import { useDispatch } from "react-redux";
import { useHash } from "./Services/Auth.Hooks";
import { useHistory } from "react-router-dom";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "821d49a1de184a378e845316ab86f438";
const redirectUri = "http://localhost:3000/";
const scopes = ["playlist-modify-public", "user-read-private"];

export default function Login() {
  const history = useHistory();
  const { hashData } = useHash();
  const token = hashData?.access_token;
  const dispatch = useDispatch();

  // Handle the login if token is present
  useEffect(() => {
    if (token) {
      dispatch(setToken(token));

      spotifyApi.setAccessToken(token);

      fetch(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          dispatch(setId(res.id));
          history.push("/search");
        })
        .catch((err) => console.error(err));
    }
  }, [dispatch, token, history]);

  return (
    <Box textAlign="center" padding="32px">
      {!hashData?.access_token && (
        <Link
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            ","
          )}&response_type=token`}
        >
          Login to Spotify
        </Link>
      )}
    </Box>
  );
}
