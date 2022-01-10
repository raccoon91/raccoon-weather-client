import { FC, useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useLayout, useAppDispatch } from "hooks";
import { getCurrentWeather, getTodayForecast } from "stores/slices/todaySlice";
import { getClimate } from "stores/slices/climateSlice";
import { Box, Flex } from "components/atoms";
import { Navigation, MobileNavigation } from "components/molecules";
import { CurrentWeather, MobileCurrentWeather } from "components/organisms";

const DashboardWrapper = styled(Box)`
  border-top-left-radius: 3rem;
`;

export const WeatherLayout: FC = () => {
  const device = useLayout();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentWeather());
    dispatch(getTodayForecast());
    dispatch(getClimate());
  }, []);

  return device === "desktop" ? (
    <Box w="100vw" h="100vh" bgc="background">
      <Flex o="hidden" w="100%" maxw="1920px" h="100%" m="0 auto" bgc="blue">
        <Box w="26rem" p="9rem 3rem 3rem">
          <CurrentWeather />
        </Box>

        <DashboardWrapper w="calc(100% - 26rem)" p="4rem 0 0" bgc="skyBlue">
          <Box h="2rem" m="0 10rem 2rem">
            <Navigation />
          </Box>

          <Box h="calc(100% - 4rem)">
            <Outlet />
          </Box>
        </DashboardWrapper>
      </Flex>
    </Box>
  ) : (
    <Box o="hidden" w="100vw" h="100vh" bgc="blue">
      <Box h="16rem" p="3rem 4rem">
        <MobileCurrentWeather />
      </Box>

      <DashboardWrapper h="calc(100% - 16rem)" p="4rem 0 0" bgc="skyBlue">
        <Box h="calc(100% - 7rem)" p="0 0 1rem">
          <Outlet context={device} />
        </Box>

        <Box h="7rem">
          <MobileNavigation />
        </Box>
      </DashboardWrapper>
    </Box>
  );
};
