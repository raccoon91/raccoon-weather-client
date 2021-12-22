import { FC, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Box, Title2, Title3, Text, Image, WeatherIcon } from "components/atoms";
import MapIcon from "images/map.svg";

type IMobileCurrentWeatherProps = ICurrentWeather;

export const MobileCurrentWeather: FC<IMobileCurrentWeatherProps> = ({ city, today, temp, sky }) => {
  const history = useHistory();
  const location = useLocation();
  const [showMapIcon, setShowMapIcon] = useState(true);

  useEffect(() => {
    const [, path] = location.pathname.split("/");

    if (path === "today") {
      setShowMapIcon(true);
    } else {
      setShowMapIcon(false);
    }
  }, []);

  const handleClickMapIcon = () => {
    const [, path] = location.pathname.split("/");

    history.push(`/${path}/map`);
  };

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
        <Box h="1.4rem">
          <Text size="md" color="white">
            Today {today}
          </Text>
        </Box>

        <Box fd="row" a="center" j="space-between" h="3.6rem" m="2rem 0 0">
          <Title2 color="white">{city}</Title2>

          {showMapIcon ? (
            <Image
              src={MapIcon}
              size={2}
              m="0 0 0 3rem"
              onClick={handleClickMapIcon}
              cursor="pointer"
              alt="지도 아이콘"
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
