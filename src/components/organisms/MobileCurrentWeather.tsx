import { memo, FC } from "react";
import { useAppSelector } from "hooks";
import { Box, Flex, Title2, Title3, Text, AnimationIcon, Skeleton } from "components/atoms";

const MobileCurrentWeather: FC = () => {
  const { weather } = useAppSelector((state) => state.today);

  return (
    <Flex a="flex-end" j="flex-start">
      {weather ? (
        <AnimationIcon sky={weather.sky} rainType={weather.rainType} size={10} imageSize={15} />
      ) : (
        <Skeleton w="10rem" h="10rem" />
      )}

      <Flex a="flex-end" m="0 0 0 4rem">
        {weather ? (
          <>
            <Title3 color="white" size="6xl" weight="normal">
              {weather.temp}
            </Title3>
            <Text color="white" size="5xl" m="0 0 1rem 1rem">
              °C
            </Text>
          </>
        ) : (
          <Skeleton w="16rem" h="7.5rem" />
        )}
      </Flex>

      <Box m="0 0 0 auto">
        {weather ? (
          <>
            <Text size="md" color="white">
              Today {weather.today}
            </Text>
            <Title2 color="white" m="1rem 0 0">
              {weather.city.korName}
            </Title2>
          </>
        ) : (
          <>
            <Skeleton w="12rem" h="1.4rem" />
            <Skeleton w="10rem" h="3.2rem" m="1rem 0 0" />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default memo(MobileCurrentWeather);
