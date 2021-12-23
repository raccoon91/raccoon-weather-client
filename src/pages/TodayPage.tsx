import { FC, useState, useEffect, useLayoutEffect } from "react";
import { useAppSelector, useAppDispatch } from "hooks";
import { getTodayWeather } from "stores/slices/todaySlice";
import { CurrentWeather, TodayDashboard, MobileCurrentWeather, MobileTodayDashboard } from "components/organisms";
import { WeatherLayout, MobileWeatherLayout } from "components/templates";

export const TodayPage: FC = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.current);
  const today = useAppSelector((state) => state.today);
  const [device, setDevice] = useState<string | null>("desktop");

  useEffect(() => {
    dispatch(getTodayWeather());
  }, []);

  useLayoutEffect(() => {
    const resize = () => {
      if (window.innerWidth > 1024) {
        setDevice("desktop");
      } else {
        setDevice("mobile");
      }
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return device === "desktop" ? (
    <WeatherLayout current={<CurrentWeather {...current} />} dashboard={<TodayDashboard {...today} />} />
  ) : (
    <MobileWeatherLayout
      current={<MobileCurrentWeather {...current} />}
      dashboard={<MobileTodayDashboard {...today} />}
    />
  );
};
