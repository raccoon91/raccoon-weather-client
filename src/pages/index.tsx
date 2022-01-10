import { FC } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TodayPage } from "./TodayPage";
import { ClimatePage } from "./ClimatePage";
import { MapPage } from "./MapPage";
import { NotFoundPage } from "./NotFoundPage";
import { WeatherLayout, ModalLayout } from "components/templates";

const Pages: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/today" />} />
        <Route path="404" element={<NotFoundPage />} />

        <Route element={<WeatherLayout />}>
          <Route path="today" element={<TodayPage />} />
          <Route path="climate" element={<ClimatePage />} />
        </Route>

        <Route path=":map" element={<ModalLayout />}>
          <Route index element={<MapPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
};

export default Pages;
