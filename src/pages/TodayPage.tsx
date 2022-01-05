import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch, useLayout } from "hooks";
import { getTodayForecast } from "stores/slices/todaySlice";
import { CurrentWeather, TodayDashboard, MobileCurrentWeather, MobileTodayDashboard } from "components/organisms";
import { WeatherLayout, MobileWeatherLayout } from "components/templates";

export const TodayPage: FC = () => {
  const dispatch = useAppDispatch();
  const { weather, forecasts } = useAppSelector((state) => state.today);
  const device = useLayout();

  useEffect(() => {
    dispatch(getTodayForecast());
  }, []);

  return device === "desktop" ? (
    <WeatherLayout
      current={<CurrentWeather weather={weather} />}
      dashboard={<TodayDashboard weather={weather} forecasts={forecasts} />}
    />
  ) : (
    <MobileWeatherLayout
      current={<MobileCurrentWeather weather={weather} />}
      dashboard={<MobileTodayDashboard weather={weather} forecasts={forecasts} />}
    />
  );
};
