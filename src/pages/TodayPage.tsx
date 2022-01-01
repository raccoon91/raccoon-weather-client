import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch, useLayout } from "hooks";
import { getTodayForecast } from "stores/slices/todaySlice";
import { CurrentWeather, TodayDashboard, MobileCurrentWeather, MobileTodayDashboard } from "components/organisms";
import { WeatherLayout, MobileWeatherLayout } from "components/templates";

export const TodayPage: FC = () => {
  const dispatch = useAppDispatch();
  const today = useAppSelector((state) => state.today);
  const device = useLayout();

  useEffect(() => {
    dispatch(getTodayForecast());
  }, []);

  return device === "desktop" ? (
    <WeatherLayout
      current={<CurrentWeather city={today.city} today={today.today} temp={today.temp} sky={today.sky} />}
      dashboard={<TodayDashboard {...today} />}
    />
  ) : (
    <MobileWeatherLayout
      current={<MobileCurrentWeather city={today.city} today={today.today} temp={today.temp} sky={today.sky} />}
      dashboard={<MobileTodayDashboard {...today} />}
    />
  );
};
