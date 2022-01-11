import { memo, FC } from "react";
import { Box, Flex, Title2, Text, AnimationIcon, Skeleton } from "components/atoms";
import { UnitText } from "components/molecules";

interface IMobileCurrentWeatherProps {
  weather: IWeather | null;
}

const MobileCurrentWeather: FC<IMobileCurrentWeatherProps> = ({ weather }) => {
  return (
    <Flex a="flex-end" j="flex-start">
      {weather ? (
        <AnimationIcon sky={weather.sky} rainType={weather.rainType} size={10} imageSize={15} />
      ) : (
        <Skeleton w="10rem" h="10rem" />
      )}

      {weather ? (
        <UnitText value={weather.temp} unit="°C" m="0 0 0 4rem" vSize="5xl" uSize="4xl" color="white" />
      ) : (
        <Skeleton w="16rem" h="7.5rem" m="0 0 0 4rem" />
      )}

      {weather ? (
        <Box m="0 0 0 auto">
          <Text size="md" color="white">
            Today {weather.today}
          </Text>
          <Title2 color="white" m="1rem 0 0">
            {weather.city.korName}
          </Title2>
        </Box>
      ) : (
        <Box m="0 0 0 auto">
          <Skeleton w="12rem" h="1.4rem" />
          <Skeleton w="10rem" h="3.2rem" m="1rem 0 0" />
        </Box>
      )}
    </Flex>
  );
};

export default memo(MobileCurrentWeather);
