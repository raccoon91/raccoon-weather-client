import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch, useLayout } from "hooks";
import { getTodayWeather } from "stores/slices/todaySlice";
import { CurrentWeather, TodayDashboard, MobileCurrentWeather, MobileTodayDashboard } from "components/organisms";
import { WeatherLayout, MobileWeatherLayout } from "components/templates";

export const TodayPage: FC = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.current);
  const today = useAppSelector((state) => state.today);
  const device = useLayout();

  useEffect(() => {
    dispatch(getTodayWeather());
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
