import { FC, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useLayout } from "hooks";
import { getWeather, getForecast } from "stores/slices/todaySlice";
import { getClimate } from "stores/slices/climateSlice";
import { WeatherPageTemplate } from "components/templates";
// import { MyPage } from "./MyPage";
import { TodayPage } from "./TodayPage";
import { ClimatePage } from "./ClimatePage";
import { MobileMapPage } from "./MobileMapPage";
import { SignInPage } from "./SignInPage";
import { SignUpPage } from "./SignUpPage";
import { NotFoundPage } from "./NotFoundPage";

const Pages: FC = () => {
  const device = useLayout();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWeather());
    dispatch(getForecast());
    dispatch(getClimate());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="404" element={<NotFoundPage />} />

        <Route element={<WeatherPageTemplate device={device} />}>
          <Route path="/" element={<TodayPage />} />
          <Route path="climate" element={<ClimatePage />} />
          <Route path="map" element={<MobileMapPage device={device} />} />
        </Route>

        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
};

export default Pages;
