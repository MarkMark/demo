import "react-toastify/dist/ReactToastify.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

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
            {routes.map(({ path, ...rest }, i) => {
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
