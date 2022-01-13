import { FC, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useLayout } from "hooks";
import { getCurrentWeather, getTodayForecast } from "stores/slices/todaySlice";
import { getClimate } from "stores/slices/climateSlice";
import { WeatherPageTemplate } from "components/templates";
import { TodayPage } from "./TodayPage";
import { ClimatePage } from "./ClimatePage";
import { MobileMapPage } from "./MobileMapPage";
import { NotFoundPage } from "./NotFoundPage";

const Pages: FC = () => {
  const device = useLayout();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentWeather());
    dispatch(getTodayForecast());
    dispatch(getClimate());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/today" />} />
        <Route path="404" element={<NotFoundPage />} />

        <Route element={<WeatherPageTemplate device={device} />}>
          <Route path="today" element={<TodayPage />} />
          <Route path="climate" element={<ClimatePage />} />
          <Route path="map" element={<MobileMapPage device={device} />} />
        </Route>

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
};

export default Pages;
