import { FC } from "react";
import { Box, Flex, Title2, Title3, Text, AnimationIcon } from "components/atoms";

interface IMobileCurrentWeatherProps {
  city: ICity | null;
  today: string;
  temp: number;
  sky: number;
  rainType: number;
}

export const MobileCurrentWeather: FC<IMobileCurrentWeatherProps> = ({ city, today, temp, sky, rainType }) => {
  return (
    <Flex a="flex-end" j="flex-start">
      <AnimationIcon sky={sky} rainType={rainType} size={10} imageSize={15} />

      <Flex a="flex-end" m="0 0 0 4rem">
        <Title3 color="white" size="6xl" weight="normal">
          {temp}
        </Title3>
        <Text color="white" size="5xl" m="0 0 1rem 1rem">
          °C
        </Text>
      </Flex>

      <Box m="0 0 0 auto">
        <Text size="md" color="white">
          Today {today}
        </Text>

        <Title2 color="white" m="1rem 0 0">
          {city?.korName || ""}
        </Title2>
      </Box>
    </Flex>
  );
};
