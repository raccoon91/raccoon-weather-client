import { FC } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { TodayPage } from "./TodayPage";
import { ClimatePage } from "./ClimatePage";
import { MapModalPage } from "./MapModalPage";
import { NotFoundPage } from "./NotFoundPage";

const Pages: FC = () => {
  return (
    <Router>
      <Switch>
        <Redirect path="/" exact to="/today" />

        <Route path="/today">
          <Route path="/today" component={TodayPage} />
          <Route path="/today/map" component={MapModalPage} />
        </Route>

        <Route path="/climate" component={ClimatePage} />

        <Route path="/404" component={NotFoundPage} />

        <Redirect path="*" to="/404" />
      </Switch>
    </Router>
  );
};

export default Pages;
