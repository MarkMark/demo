import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Box } from "../../Components/Layout/Box";
import { Link } from "rendition";
import { selectUser } from "./Services/User.Redux";
import { useAuth } from "./Services/Auth.Hooks";
import { useSelector } from "react-redux";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "821d49a1de184a378e845316ab86f438";
const redirectUri = "http://localhost:3000/";
const scopes = ["playlist-modify-public", "user-read-private"];

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const hash = location.hash;
  const { token, getToken, setAuth, setStoredToken } = useAuth();
  const { id } = useSelector(selectUser);

  useEffect(() => {
    if (hash) getToken(hash);
  }, [getToken, hash]);

  useEffect(() => {
    if (token && !id) {
      setAuth(token);
      setStoredToken(token);
      history.push("/search");
    }
  }, [setAuth, id, token, setStoredToken, history]);

  return (
    <Box textAlign="center" padding="32px">
      {!token && (
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
