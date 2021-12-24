import React, { FC } from "react";
import styled from "styled-components";
import { Flex, Box } from "components/atoms";
import { Navigation } from "components/molecules";

const DashboardWrapper = styled(Box)`
  border-top-left-radius: 3rem;
`;

interface IWeatherLayoutProps {
  current: React.ReactNode;
  dashboard: React.ReactNode;
}

export const WeatherLayout: FC<IWeatherLayoutProps> = ({ current, dashboard }) => {
  return (
    <Flex o="hidden" w="100vw" maxw="1920px" h="100vh" m="0 auto" bgc="blue">
      <Box w="26rem" p="9rem 3rem 3rem">
        {current}
      </Box>

      <DashboardWrapper w="calc(100% - 26rem)" p="4rem 0 0" bgc="skyBlue">
        <Box h="2rem" m="0 10rem 2rem">
          <Navigation />
        </Box>

        <Box h="calc(100% - 4rem)">{dashboard}</Box>
      </DashboardWrapper>
    </Flex>
  );
};
