import { FC } from "react";
import { WeatherLayout } from "components/templates";

export const MainPage: FC = () => {
  return <WeatherLayout city="Seoul" today="12/07" temp="10" sky="sunny" text="test" />;
};
