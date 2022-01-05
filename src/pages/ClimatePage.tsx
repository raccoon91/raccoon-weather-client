import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch, useLayout } from "hooks";
import { getClimate } from "stores/slices/climateSlice";
import { CurrentWeather, ClimateDashboard, MobileCurrentWeather, MobileClimateDashboard } from "components/organisms";
import { WeatherLayout, MobileWeatherLayout } from "components/templates";

export const ClimatePage: FC = () => {
  const dispatch = useAppDispatch();
  const { weather } = useAppSelector((state) => state.today);
  const climate = useAppSelector((state) => state.climate);
  const device = useLayout();

  useEffect(() => {
    dispatch(getClimate());
  }, []);

  return device === "desktop" ? (
    <WeatherLayout current={<CurrentWeather weather={weather} />} dashboard={<ClimateDashboard climate={climate} />} />
  ) : (
    <MobileWeatherLayout
      current={<MobileCurrentWeather weather={weather} />}
      dashboard={<MobileClimateDashboard climate={climate} />}
    />
  );
};
