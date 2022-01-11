import React, { FC } from "react";
import styled from "styled-components";
import { Box } from "components/atoms";
import { MobileNavigation } from "components/molecules";

const DashboardWrapper = styled(Box)`
  border-top-left-radius: 3rem;
`;

interface IMobileWeatherTemplateProps {
  current: React.ReactNode;
  dashboard: React.ReactNode;
}

export const MobileWeatherTemplate: FC<IMobileWeatherTemplateProps> = ({ current, dashboard }) => {
  return (
    <Box o="hidden" w="100vw" h="100vh" bgc="blue">
      <Box h="16rem" p="3rem 4rem">
        {current}
      </Box>

      <DashboardWrapper h="calc(100% - 16rem)" p="4rem 0 0" bgc="skyBlue">
        <Box h="calc(100% - 7rem)" p="0 0 1rem">
          {dashboard}
        </Box>

        <Box h="7rem">
          <MobileNavigation />
        </Box>
      </DashboardWrapper>
    </Box>
  );
};
