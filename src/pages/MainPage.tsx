import React, { FC } from "react";
import { Layout, Box, FlexBox } from "src/components/base";
import { CurrentWeather, MapChart, Climates, GlobalTemperatureChart } from "src/components/main";

export const MainPage: FC = () => {
  return (
    <Layout>
      <FlexBox width="100%" height="100px" margin="0 0 2vh">
        <CurrentWeather />
      </FlexBox>

      <FlexBox>
        <FlexBox direction="column" width="60%" margin="0 20px 0 0">
          <Box width="100%" height="480px">
            <MapChart />
          </Box>
          <Box width="100%" height="230px" margin="20px 0 0">
            <GlobalTemperatureChart />
          </Box>
        </FlexBox>

        <FlexBox direction="column" width="calc(40% - 20px)" height="730px" justifyContent="space-between">
          <Climates />
        </FlexBox>
      </FlexBox>
    </Layout>
  );
};
