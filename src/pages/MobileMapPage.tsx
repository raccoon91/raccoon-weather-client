import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { Box, Flex, Text, Button, MapChart } from "components/atoms";
import { DashboardTemplate } from "components/templates";
import { changeSearchCity, changeCity } from "stores/slices/todaySlice";
import { convertCityName } from "utils";

interface IMobileMapPageProps {
  device: "desktop" | "mobile";
}

export const MobileMapPage: FC<IMobileMapPageProps> = ({ device }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (device === "desktop") {
      navigate("/");
    }
  }, [device]);

  const dispatch = useAppDispatch();
  const { search, weather } = useAppSelector((state) => state.today);

  const handleClickCity = (cityName: string) => {
    dispatch(changeSearchCity(cityName));
  };

  const handleClickChangeCity = () => {
    if (search) {
      dispatch(changeCity(search));
      navigate("/");
    }
  };

  return (
    <DashboardTemplate>
      <Box po="relative" w="100%" h="100%" p="3rem 4rem" bgc="skyBlue">
        <MapChart cityName={search} onClick={handleClickCity} />

        <Flex po="absolute" r="3rem" b="4rem" a="center" j="flex-end" h="4rem" m="0 0 4rem">
          <Text size="2xl" m="0 3rem 0 0">
            {convertCityName(search)}
          </Text>
          <Button size="2xl" weight="bold" disabled={weather?.city?.name === search} onClick={handleClickChangeCity}>
            변경
          </Button>
        </Flex>
      </Box>
    </DashboardTemplate>
  );
};
