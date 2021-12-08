import { FC } from "react";
import { Box, Title3, Text } from "components/atoms";
import { TodayDashboard } from "components/organisms";

interface IWeatherLayoutProps {
  side: {
    city: string;
    today: string;
    temp: string;
    sky: string;
  };
  dashboard: {
    feel: string;
    humid: string;
    rain: string;
    air1: string;
    air2: string;
    wind: string;
  };
}

export const WeatherLayout: FC<IWeatherLayoutProps> = ({
  side: { city, today, temp, sky },
  dashboard: { feel, humid, rain, air1, air2, wind },
}) => {
  return (
    <Box o="hidden" fd="row" w="100vw" h="100vh" bgc="blue">
      <Box w="20%" minw="200px" h="100%" p="80px 30px 30px">
        <Text color="white">{city}</Text>
        <Text color="white">{today}</Text>

        <Title3 color="white" size="3xl">
          {temp}
        </Title3>

        <Text color="white">{sky}</Text>
      </Box>

      <TodayDashboard feel={feel} humid={humid} rain={rain} air1={air1} air2={air2} wind={wind} />
    </Box>
  );
};
