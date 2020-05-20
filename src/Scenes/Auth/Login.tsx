import { Box } from "../../Components/Layout/Box";
import { Link } from "rendition";
import React from "react";
import { selectUser } from "./Services/User.Redux";
import { useAuth } from "./Services/Auth.Hooks";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "821d49a1de184a378e845316ab86f438";
const redirectUri = "http://localhost:3000/";
const scopes = ["playlist-modify-public", "user-read-private"];

export default function Login() {
  const location = useLocation();
  const hash = location.hash;
  console.log(hash);
  const { token, getToken, storeToken } = useAuth();
  const { id } = useSelector(selectUser);

  // useEffect(() => {
  //   console.log("hash", hash);
  //   // if (hash) getToken(hash);
  // }, [getToken, hash]);

  // useEffect(() => {
  //   console.log("token", token);
  //   if (token && !id) {
  //     // storeToken();
  //   }
  // }, [storeToken, id, token]);

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
