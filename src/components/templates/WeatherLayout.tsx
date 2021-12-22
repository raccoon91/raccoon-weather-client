import React, { FC } from "react";
import { Box } from "components/atoms";

interface IWeatherLayoutProps {
  current: React.ReactNode;
  dashboard: React.ReactNode;
}

export const WeatherLayout: FC<IWeatherLayoutProps> = ({ current, dashboard }) => {
  return (
    <Box o="hidden" fd="row" w="100vw" maxw="1440px" h="100vh" m="0 auto" bgc="blue">
      <Box w="20%" minw="20rem" h="100%" p="9rem 3rem 3rem">
        {current}
      </Box>

      <Box f="1" h="100%" p="4rem 0" bgc="skyBlue" btlr="3rem">
        {dashboard}
      </Box>
    </Box>
  );
};
