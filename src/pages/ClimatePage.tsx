import { FC } from "react";
import { useAppSelector } from "hooks";
import { CurrentWeather, MobileCurrentWeather, ClimateDashboard, MobileClimateDashboard } from "components/organisms";
import { WeatherTemplate, MobileWeatherTemplate } from "components/templates";

interface IClimatePageProps {
  device: "desktop" | "mobile";
}

export const ClimatePage: FC<IClimatePageProps> = ({ device }) => {
  const { weather } = useAppSelector((state) => state.today);
  const climate = useAppSelector((state) => state.climate);

  if (device === "desktop") {
    return (
      <WeatherTemplate
        current={<CurrentWeather weather={weather} />}
        dashboard={<ClimateDashboard climate={climate} />}
      />
    );
  }

  return (
    <MobileWeatherTemplate
      current={<MobileCurrentWeather weather={weather} />}
      dashboard={<MobileClimateDashboard climate={climate} />}
    />
  );
};
