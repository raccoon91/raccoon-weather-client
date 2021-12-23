import { FC, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Box, Title2, Title3, Text, Image, AnimationIcon } from "components/atoms";
import MapIcon from "images/map.svg";

type ICurrentWeatherProps = ICurrentWeather;

export const CurrentWeather: FC<ICurrentWeatherProps> = ({ city, today, temp, sky }) => {
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
    <Box>
      <Box fd="row" a="center" j="space-between" h="3.6rem">
        <Title2 color="white">{city}</Title2>

        {showMapIcon ? (
          <Image src={MapIcon} size={2} onClick={handleClickMapIcon} cursor="pointer" alt="지도 아이콘" />
        ) : null}
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
        <AnimationIcon type={sky} size={32} />
      </Box>
    </Box>
  );
};
