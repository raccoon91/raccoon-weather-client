import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { Box, Flex, Text, Button, MapChart } from "components/atoms";
import { DashboardTemplate } from "components/templates";
import { changeCity } from "stores/slices/todaySlice";
import { convertCityName } from "utils";

interface IMobileMapPageProps {
  device: "desktop" | "mobile";
}

export const MobileMapPage: FC<IMobileMapPageProps> = ({ device }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (device === "desktop") {
      navigate("/today");
    }
  }, [device]);

  const dispatch = useAppDispatch();
  const { search, weather } = useAppSelector((state) => state.today);

  const handleClickCity = (cityName: string) => {
    dispatch(changeCity(cityName));
  };

  return (
    <DashboardTemplate>
      <Box w="100%" h="100%" p="3rem 4rem" bgc="skyBlue">
        <Box h="calc(100% - 6rem)">
          <MapChart cityName={search} onClick={handleClickCity} />
        </Box>

        <Flex a="center" j="flex-end" h="4rem" m="0 0 2rem">
          <Text size="2xl" m="0 3rem 0 0">
            {convertCityName(search)}
          </Text>
          <Button size="2xl" weight="bold" disabled={weather?.city?.name === search}>
            변경
          </Button>
        </Flex>
      </Box>
    </DashboardTemplate>
  );
};
