import { FC } from "react";
import { Box, Title2, Title3, Text, Image, WeatherIcon } from "components/atoms";
import MapIcon from "images/map.svg";

type ICurrentWeatherProps = ICurrentWeather;

export const CurrentWeather: FC<ICurrentWeatherProps> = ({ city, today, temp, sky }) => {
  return (
    <Box>
      <Box fd="row" a="center" j="space-between" h="3.6rem">
        <Title2 color="white">{city}</Title2>
        <Image src={MapIcon} size={2} alt="지도 아이콘" />
      </Box>

      <Box h="1.4rem" m="1.6rem 0 0">
        <Text color="white">Today {today}</Text>
      </Box>

      <Box fd="row" a="flex-end" j="center" h="8.4rem" m="5rem 0 0">
        <Title3 color="white" size="6xl" weight="normal">
          {temp}
        </Title3>
        <Text color="white" size="5xl" m="0 0 1rem 1rem">
          °C
        </Text>
      </Box>

      <Box a="center">
        <WeatherIcon type={sky} size={32} />
      </Box>
    </Box>
  );
};
