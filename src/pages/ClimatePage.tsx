import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch, useLayout } from "hooks";
import { getClimate } from "stores/slices/climateSlice";
import { CurrentWeather, ClimateDashboard, MobileCurrentWeather, MobileClimateDashboard } from "components/organisms";
import { WeatherLayout, MobileWeatherLayout } from "components/templates";

export const ClimatePage: FC = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.current);
  const climate = useAppSelector((state) => state.climate);
  const device = useLayout();

  useEffect(() => {
    dispatch(getClimate());
  }, []);

  return device === "desktop" ? (
    <WeatherLayout current={<CurrentWeather {...current} />} dashboard={<ClimateDashboard {...climate} />} />
  ) : (
    <MobileWeatherLayout
      current={<MobileCurrentWeather {...current} />}
      dashboard={<MobileClimateDashboard {...climate} />}
    />
  );
};
