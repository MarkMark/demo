import { Redirect, Route, RouteProps } from "react-router-dom";

import React from "react";
import { useAuth } from "../../Scenes/Auth/Services/Auth.Hooks";

interface IPrivateRoute extends RouteProps {
  component: any;
  redirect?: string;
}

export default function PrivateRoute({
  component: Component,
  ...rest
}: IPrivateRoute) {
  const { getStoredToken, setAuth } = useAuth();
  const token = getStoredToken();
  const isAuthenticated = !!token;

  if (token) setAuth(token);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: rest.redirect ? rest.redirect : "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
