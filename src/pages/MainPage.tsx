import { FC } from "react";
import { WeatherLayout } from "components/templates";

const data = {
  side: {
    city: "서울",
    today: "12/07",
    temp: "10",
    sky: "sunny",
  },
  dashboard: {
    feel: "8",
    humid: "81",
    rain: "19",
    air1: "81",
    air2: "76",
    wind: "10",
  },
};

export const MainPage: FC = () => {
  return <WeatherLayout side={data.side} dashboard={data.dashboard} />;
};
