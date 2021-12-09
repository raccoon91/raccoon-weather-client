import React, { FC } from "react";
import { Box } from "components/atoms";

interface IWeatherLayoutProps {
  current: React.ReactNode;
  dashboard: React.ReactNode;
}

export const WeatherLayout: FC<IWeatherLayoutProps> = ({ current, dashboard }) => {
  return (
    <Box o="hidden" fd="row" w="100vw" h="100vh" bgc="blue">
      {current}
      {dashboard}
    </Box>
  );
};
