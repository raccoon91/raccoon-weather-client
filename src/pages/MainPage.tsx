import React, { FC } from "react";
import styled from "styled-components";
import { Layout, Box, FlexBox } from "src/components/base";
import { CurrentWeather, MapChart, Climates, GlobalTemperatureChart } from "src/components/main";

const MainLayout = styled(Layout)`
  @media (max-width: 900px) {
    padding: 20px;
  }
`;

const WeatherWrapper = styled(FlexBox)`
  @media (max-width: 900px) {
    height: unset;
    margin-bottom: 20px;
    color: red;
  }
`;

const MainWrapper = styled(FlexBox)`
  @media (max-width: 900px) {
    flex-direction: column;
    height: unset;
  }
`;

const Left = styled(FlexBox)`
  @media (max-width: 900px) {
    width: 100%;
    margin: 0;
  }
`;

const MapChartWrapper = styled(Box)`
  @media (max-width: 900px) {
    width: 100%;
    height: 480px;
  }
`;

const GlobalTempWrapper = styled(Box)`
  @media (max-width: 900px) {
    width: 100%;
    height: 230px;
    margin-bottom: 20px;
  }
`;

const ClimateWrapper = styled(FlexBox)`
  @media (max-width: 900px) {
    width: 100%;
    height: 730px;
  }
`;

export const MainPage: FC = () => {
  return (
    <MainLayout>
      <WeatherWrapper width="100%" height="100px" margin="0 0 2vh">
        <CurrentWeather />
      </WeatherWrapper>

      <MainWrapper>
        <Left direction="column" width="60%" margin="0 20px 0 0">
          <MapChartWrapper width="100%" height="480px">
            <MapChart />
          </MapChartWrapper>
          <GlobalTempWrapper width="100%" height="230px" margin="20px 0 0">
            <GlobalTemperatureChart />
          </GlobalTempWrapper>
        </Left>

        <ClimateWrapper direction="column" width="calc(40% - 20px)" height="730px" justifyContent="space-between">
          <Climates />
        </ClimateWrapper>
      </MainWrapper>
    </MainLayout>
  );
};
