import { selectAuth, setToken } from "./Auth.Redux";
import { useDispatch, useSelector } from "react-redux";

import { setId } from "./User.Redux";
import spotifyApi from "../../../Services/Config/spotify";

interface IHashData {
  access_token: string;
  expires_in: string;
  token_type: string;
}

export function useAuth() {
  const dispatch = useDispatch();
  const { token } = useSelector(selectAuth);

  const getHash = (hash: string) => {
    const getData = hash
      .substring(1)
      .split("&")
      .reduce((initial: any, item): IHashData => {
        if (item) {
          const parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }

        return initial;
      }, {}) as IHashData;

    localStorage.setItem("token", getData.access_token);
    dispatch(setToken(getData.access_token));
    window.location.hash = "";
  };

  const setAuth = (token: string) => {
    spotifyApi.setAccessToken(token);

    spotifyApi
      .getMe()
      .then(({ id }) => dispatch(setId(id)))
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
      });
  };

  const getStoredToken = () => localStorage.getItem("token");
  const setStoredToken = (token: string) =>
    localStorage.setItem("token", token);

  return {
    token,
    setAuth: (token: string) => setAuth(token),
    getToken: (hash: string) => getHash(hash),
    setStoredToken: (token: string) => setStoredToken(token),
    getStoredToken,
  };
}
