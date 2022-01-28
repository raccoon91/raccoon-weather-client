import { FC } from "react";
import styled from "styled-components";
import { Grid, Box, Flex, Title2, Text, Image, AnimationIcon, Skeleton } from "components/atoms";
import { UnitText } from "components/molecules";
import MapIcon from "images/map.svg";

const CurrentWeatherContainer = styled(Grid)`
  @media ${({ theme }) => theme.device.desktop} {
    grid-template-columns: 100%;
    grid-template-rows: 3.6rem 1.4rem 1.6rem 5rem 8.4rem 5rem 20rem;
    grid-template-areas: "city" " .  " "date" " .  " "temp" " .  " "icon";
    padding: 9rem 3rem 3rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 10rem 1fr 4rem 7rem;
    grid-template-rows: 2rem 1.4rem 2rem 3.6rem 1rem;
    grid-template-areas:
      "icon temp  .     . "
      "icon temp date date"
      "icon temp  .     . "
      "icon temp  .   city"
      "icon temp  .     . ";
    padding: 3rem 1rem 3rem 4rem;
  }
`;

interface ICurrentWeatherProps {
  weather: IWeather | null;
  showMapModalButton?: boolean;
  openMapModal?: () => void;
}

export const CurrentWeather: FC<ICurrentWeatherProps> = ({ weather, showMapModalButton, openMapModal }) => {
  const handleClickMapIcon = () => {
    if (openMapModal) {
      openMapModal();
    }
  };

  return (
    <CurrentWeatherContainer w="100%" h="100%">
      <Box ga="city">
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
      </Box>

      <Box ga="date" h="1.4rem">
        {weather ? <Text color="white">Today {weather.today}</Text> : <Skeleton h="1.4rem" />}
      </Box>

      <Flex ga="temp" j="center">
        {weather ? (
          <UnitText value={weather.temp} unit="°C" h="8.4rem" vSize="5xl" uSize="4xl" color="white" />
        ) : (
          <Skeleton w="20rem" h="8.4rem" />
        )}
      </Flex>

      <Box ga="icon">
        <AnimationIcon
          isLoad={weather ? true : false}
          sky={weather?.sky}
          rainType={weather?.rainType}
          date={weather?.today}
        />
      </Box>
    </CurrentWeatherContainer>
  );
};
