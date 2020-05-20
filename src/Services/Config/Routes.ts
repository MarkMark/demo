import Login from "../../Scenes/Auth/Login";
import Search from "../../Scenes/Search/Search";

export const routes = [
  {
    path: ["", "/login"],
    component: Login,
    exact: true,
  },
  {
    path: ["/search"],
    component: Search,
    exact: true,
    isPrivate: true,
  },
];
