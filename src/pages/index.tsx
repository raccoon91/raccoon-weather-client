import { FC, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<Navigate to="/today" />} />
        <Route path="404" element={<NotFoundPage />} />

        <Route path="today" element={<TodayPage />} />
        <Route
          path="today/map"
          element={
            <>
              <TodayPage />
              <MapModalPage />
            </>
          }
        />
        <Route path="climate" element={<ClimatePage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
};

export default Pages;
