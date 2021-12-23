import { FC } from "react";
import { Box, Title2, Title3, Text, WeatherIcon } from "components/atoms";

type IMobileCurrentWeatherProps = ICurrentWeather;

export const MobileCurrentWeather: FC<IMobileCurrentWeatherProps> = ({ city, today, temp, sky }) => {
  return (
    <Box fd="row" a="center" j="space-between" h="100%">
      <Box fd="row" a="flex-end" h="100%">
        <Box o="hidden" w="10rem" h="10rem" a="center" j="center" m="0 6rem 0 0">
          <WeatherIcon type={sky} size={24} />
        </Box>

        <Box fd="row" a="flex-end" j="center" h="8.4rem">
          <Title3 color="white" size="6xl" weight="normal">
            {temp}
          </Title3>
          <Text color="white" size="5xl" m="0 0 1rem 1rem">
            °C
          </Text>
        </Box>
      </Box>

      <Box j="flex-end" h="100%">
        <Text size="md" color="white">
          Today {today}
        </Text>

        <Title2 color="white" m="1rem 0 0">
          {city}
        </Title2>
      </Box>
    </Box>
  );
};
