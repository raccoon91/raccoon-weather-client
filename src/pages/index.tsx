import { FC, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useAppDispatch } from "hooks";
import { getCurrentWeather } from "stores/slices/currentSlice";
import { TodayPage } from "./TodayPage";
import { ClimatePage } from "./ClimatePage";
import { MapModalPage } from "./MapModalPage";
import { NotFoundPage } from "./NotFoundPage";

const Pages: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentWeather());
  }, []);

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
