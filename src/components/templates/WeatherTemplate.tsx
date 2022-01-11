import React, { FC } from "react";
import styled from "styled-components";
import { Box, Flex } from "components/atoms";
import { Navigation } from "components/molecules";

const DashboardWrapper = styled(Box)`
  border-top-left-radius: 3rem;
`;

interface IWeatherTemplateProps {
  current: React.ReactNode;
  dashboard: React.ReactNode;
}

export const WeatherTemplate: FC<IWeatherTemplateProps> = ({ current, dashboard }) => {
  return (
    <Box w="100vw" h="100vh" bgc="background">
      <Flex o="hidden" w="100%" maxw="1920px" h="100%" m="0 auto" bgc="blue">
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
    </Box>
  );
};
