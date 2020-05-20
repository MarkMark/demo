import { selectAuth, setToken } from "./Auth.Redux";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { setId } from "./User.Redux";
import spotifyApi from "../../../Services/Config/spotify";

interface IHashData {
  access_token: string;
  expires_in: string;
  token_type: string;
}

export function useAuth() {
  const dispatch = useDispatch();
  const location = useLocation();
  const hash = location.hash;
  const { token } = useSelector(selectAuth);
  const history = useHistory();

  const getHash = (hash: string) => {
    console.log(hash);

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

    console.log("getData", getData);
    localStorage.setItem("token", getData.access_token);
    dispatch(setToken(getData.access_token));
    // window.location.hash = "";
  };

  const storeToken = () => {
    console.log("hit");
    if (token) {
      spotifyApi.setAccessToken(token);

      spotifyApi
        .getMe()
        .then(({ id }) => {
          dispatch(setId(id));
          localStorage.setItem("token", token);
          history.push("/search");
        })
        .catch((err) => console.error(err));
    }
  };

  const getStoredToken = () => localStorage.getItem("token");

  return {
    token,
    getToken: (hash: string) => getHash(hash),
    storeToken,
    getStoredToken,
  };
}
