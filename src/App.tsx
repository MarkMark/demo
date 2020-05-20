import "react-toastify/dist/ReactToastify.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./Components/Routes/PrivateRoute";
import { Provider } from "rendition";
import React from "react";
import { ToastContainer } from "react-toastify";
import { routes } from "./Services/Config/Routes";

function App() {
  return (
    <Provider>
      <main>
        <Router>
          <Switch>
            {routes.map(({ path, isPrivate, ...rest }, i) => {
              if (isPrivate)
                return <PrivateRoute key={i} {...rest} path={path} />;

              return <Route key={i} {...rest} path={path} />;
            })}
          </Switch>
        </Router>

        <ToastContainer />
      </main>
    </Provider>
  );
}

export default App;
