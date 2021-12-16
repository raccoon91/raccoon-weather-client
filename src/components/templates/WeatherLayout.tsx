import React, { FC } from "react";
import { Box } from "components/atoms";

interface IWeatherLayoutProps {
  current: React.ReactNode;
  dashboard: React.ReactNode;
}

export const WeatherLayout: FC<IWeatherLayoutProps> = ({ current, dashboard }) => {
  return (
    <Box o="hidden" fd="row" w="100vw" h="100vh" bgc="blue">
      <Box w="20%" minw="20rem" h="100%" p="9rem 3rem 3rem">
        {current}
      </Box>

      <Box o="hidden auto" f="1" h="100%" p="4rem 6rem" bgc="skyBlue" btlr="3rem">
        {dashboard}
      </Box>
    </Box>
  );
};
