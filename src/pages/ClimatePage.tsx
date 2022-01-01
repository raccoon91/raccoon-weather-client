import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch, useLayout } from "hooks";
import { getClimate } from "stores/slices/climateSlice";
import { CurrentWeather, ClimateDashboard, MobileCurrentWeather, MobileClimateDashboard } from "components/organisms";
import { WeatherLayout, MobileWeatherLayout } from "components/templates";

export const ClimatePage: FC = () => {
  const dispatch = useAppDispatch();
  const today = useAppSelector((state) => state.today);
  const climate = useAppSelector((state) => state.climate);
  const device = useLayout();

  useEffect(() => {
    dispatch(getClimate());
  }, []);

  return device === "desktop" ? (
    <WeatherLayout
      current={<CurrentWeather city={today.city} today={today.today} temp={today.temp} sky={today.sky} />}
      dashboard={<ClimateDashboard {...climate} />}
    />
  ) : (
    <MobileWeatherLayout
      current={<MobileCurrentWeather city={today.city} today={today.today} temp={today.temp} sky={today.sky} />}
      dashboard={<MobileClimateDashboard {...climate} />}
    />
  );
};
