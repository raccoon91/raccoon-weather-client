import { memo, FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "hooks";
import { Box, Flex, Title2, Title3, Text, Image, AnimationIcon, Skeleton } from "components/atoms";
import MapIcon from "images/map.svg";

const CurrentWeather: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMapIcon, setShowMapIcon] = useState(true);
  const { weather } = useAppSelector((state) => state.today);

  useEffect(() => {
    const [, path] = location.pathname.split("/");

    if (path === "today") {
      setShowMapIcon(true);
    } else {
      setShowMapIcon(false);
    }
  }, []);

  const handleClickMapIcon = () => {
    navigate("/map");
  };

  return (
    <Box>
      <Flex a="center" j="space-between" h="3.6rem">
        {weather ? (
          <>
            <Title2 color="white">{weather.city.korName}</Title2>
            {showMapIcon ? (
              <Image src={MapIcon} size={2} onClick={handleClickMapIcon} cursor="pointer" alt="지도 아이콘" />
            ) : null}
          </>
        ) : (
          <Skeleton w="100%" h="3.6rem" />
        )}
      </Flex>

      <Box h="1.4rem" m="1.6rem 0 0">
        {weather ? <Text color="white">Today {weather.today}</Text> : <Skeleton w="70%" h="1.4rem" />}
      </Box>

      <Flex a="flex-end" j="center" h="8.4rem" m="5rem 0">
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
          <Skeleton w="100%" h="100%" />
        )}
      </Flex>

      {weather ? (
        <AnimationIcon sky={weather.sky} rainType={weather.rainType} size={20} />
      ) : (
        <Skeleton w="20rem" h="20rem" />
      )}
    </Box>
  );
};

export default memo(CurrentWeather);
