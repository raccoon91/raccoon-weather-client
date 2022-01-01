import { FC } from "react";
import { Box, Flex, Title2, Title3, Text, AnimationIcon } from "components/atoms";

interface IMobileCurrentWeatherProps {
  city: string;
  today: string;
  temp: number;
  sky: number;
}

export const MobileCurrentWeather: FC<IMobileCurrentWeatherProps> = ({ city, today, temp, sky }) => {
  return (
    <Flex a="flex-end" j="flex-start">
      <Flex a="center" j="center" w="10rem" h="10rem" m="0 4rem 0 0">
        <AnimationIcon type={sky} size={24} />
      </Flex>

      <Title3 color="white" size="6xl" weight="normal">
        {temp}
      </Title3>
      <Text color="white" size="5xl" m="0 0 1rem 1rem">
        °C
      </Text>

      <Box m="0 0 0 auto">
        <Text size="md" color="white">
          Today {today}
        </Text>

        <Title2 color="white" m="1rem 0 0">
          {city}
        </Title2>
      </Box>
    </Flex>
  );
};
