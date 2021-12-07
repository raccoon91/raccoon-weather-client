import { FC } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { MainPage } from "./MainPage";
import { NotFoundPage } from "./NotFoundPage";

const Pages: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/404" exact component={NotFoundPage} />

        <Redirect path="*" to="/404" />
      </Switch>
    </Router>
  );
};

export default Pages;
