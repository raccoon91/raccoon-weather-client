import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main, NoMatch, Test } from "src/pages";
import "./App.scss";

export const App: FC = () => {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route  path="/test">
            <Test />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
