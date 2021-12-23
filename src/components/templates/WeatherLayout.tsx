import React, { FC } from "react";
import { Box } from "components/atoms";
import { Navigation } from "components/molecules";

interface IWeatherLayoutProps {
  current: React.ReactNode;
  dashboard: React.ReactNode;
}

export const WeatherLayout: FC<IWeatherLayoutProps> = ({ current, dashboard }) => {
  return (
    <Box o="hidden" fd="row" w="100vw" maxw="1920px" h="100vh" m="0 auto" bgc="blue">
      <Box w="26rem" h="100%" p="9rem 3rem 3rem">
        {current}
      </Box>

      <Box w="calc(100% - 26rem)" h="100%" p="4rem 0 0" bgc="skyBlue" btlr="3rem">
        <Box w="100%" h="2rem" m="0 10rem 2rem">
          <Navigation />
        </Box>

        <Box w="100%" h="calc(100% - 4rem)">
          {dashboard}
        </Box>
      </Box>
    </Box>
  );
};
