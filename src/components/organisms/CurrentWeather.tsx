import { memo, FC } from "react";
import { Box, Flex, Title2, Text, Image, AnimationIcon, Skeleton } from "components/atoms";
import { UnitText } from "components/molecules";
import MapIcon from "images/map.svg";

interface ICurrentWeatherProps {
  weather: IWeather | null;
  showMapModalButton?: boolean;
  openMapModal?: () => void;
}

const CurrentWeather: FC<ICurrentWeatherProps> = ({ weather, showMapModalButton, openMapModal }) => {
  const handleClickMapIcon = () => {
    if (openMapModal) {
      openMapModal();
    }
  };

  return (
    <Box>
      {weather ? (
        <Flex a="center" j="space-between" h="3.6rem">
          <Title2 color="white">{weather.city.korName}</Title2>

          {showMapModalButton ? (
            <Image src={MapIcon} size={2} onClick={handleClickMapIcon} cursor="pointer" alt="지도 아이콘" />
          ) : null}
        </Flex>
      ) : (
        <Skeleton h="3.6rem" />
      )}

      <Box h="1.4rem" m="1.6rem 0 0">
        {weather ? <Text color="white">Today {weather.today}</Text> : <Skeleton w="70%" h="1.4rem" />}
      </Box>

      {weather ? (
        <UnitText value={weather.temp} unit="°C" h="8.4rem" m="5rem 0" vSize="5xl" uSize="4xl" color="white" />
      ) : (
        <Skeleton h="8.4rem" m="5rem 0" />
      )}

      {weather ? (
        <AnimationIcon sky={weather.sky} rainType={weather.rainType} size={20} />
      ) : (
        <Skeleton w="20rem" h="20rem" />
      )}
    </Box>
  );
};

export default memo(CurrentWeather);
