import React, { FC } from "react";
import { Box } from "components/atoms";
import { MobileNavigation } from "components/molecules";

interface IMobileWeatherLayoutProps {
  current: React.ReactNode;
  dashboard: React.ReactNode;
}

export const MobileWeatherLayout: FC<IMobileWeatherLayoutProps> = ({ current, dashboard }) => {
  return (
    <Box o="hidden" w="100vw" h="100vh" bgc="blue">
      <Box w="100%" h="16rem" p="4rem 3rem 3rem">
        {current}
      </Box>

      <Box f="1" h="calc(100% - 18rem)" p="4rem 0 0" bgc="skyBlue" btlr="3rem">
        <Box w="100%" h="calc(100% - 7rem)">
          {dashboard}
        </Box>

        <Box w="100%" h="7rem">
          <MobileNavigation />
        </Box>
      </Box>
    </Box>
  );
};
