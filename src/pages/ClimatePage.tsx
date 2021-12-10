import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "hooks";
import { getCurrentWeather } from "stores/slices/currentSlice";
import { getClimate } from "stores/slices/climateSlice";
import { CurrentWeather, ClimateDashboard } from "components/organisms";
import { WeatherLayout } from "components/templates";

export const ClimatePage: FC = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.current);
  const climate = useAppSelector((state) => state.climate);

  useEffect(() => {
    dispatch(getCurrentWeather());
    dispatch(getClimate());
  }, []);

  return <WeatherLayout current={<CurrentWeather {...current} />} dashboard={<ClimateDashboard {...climate} />} />;
};
