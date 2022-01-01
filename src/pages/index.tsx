import { FC, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useAppDispatch } from "hooks";
import { getCurrentWeather } from "stores/slices/todaySlice";
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

        <Route path="/today" component={TodayPage} />
        <Route path="/climate" exact component={ClimatePage} />
        <Route path="/404" exact component={NotFoundPage} />

        <Redirect path="*" to="/404" />
      </Switch>

      <Route path="/today/map" component={MapModalPage} />
    </Router>
  );
};

export default Pages;
