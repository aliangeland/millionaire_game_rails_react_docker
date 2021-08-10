import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./containers/Home";
import Authentication from "./containers/Authentication";
import Play from "./containers/Play";
import Menu from "./containers/Menu";
import AdminPanel from "./containers/AdminPanel";
import { GlobalProvider } from "./context/GlobalState";

export default function App() {
  return (
    <GlobalProvider>
      <Router>
        <Menu />
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/login" exact render={() => <Authentication />} />
          <Route path="/play" exact render={() => <Play />} />
          <Route path="/panel" exact render={() => <AdminPanel />} />
        </Switch>
      </Router>
    </GlobalProvider>
  );
}
