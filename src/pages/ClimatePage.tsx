import { FC, useState, useEffect, useLayoutEffect } from "react";
import { useAppSelector, useAppDispatch } from "hooks";
import { getClimate } from "stores/slices/climateSlice";
import { CurrentWeather, ClimateDashboard, MobileCurrentWeather, MobileClimateDashboard } from "components/organisms";
import { WeatherLayout, MobileWeatherLayout } from "components/templates";

export const ClimatePage: FC = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.current);
  const climate = useAppSelector((state) => state.climate);
  const [device, setDevice] = useState<string | null>("desktop");

  useEffect(() => {
    dispatch(getClimate());
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
    <WeatherLayout current={<CurrentWeather {...current} />} dashboard={<ClimateDashboard {...climate} />} />
  ) : (
    <MobileWeatherLayout
      current={<MobileCurrentWeather {...current} />}
      dashboard={<MobileClimateDashboard {...climate} />}
    />
  );
};
