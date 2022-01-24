import { FC } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "hooks";
import { Grid, Box, Flex, Text, Button, MapChart } from "components/atoms";
import { changeSearchCity, changeCity } from "stores/slices/todaySlice";
import { convertCityName } from "utils";

const MapModalContainer = styled(Grid)`
  grid-template-columns: calc(100% - 6rem) 6rem;
  grid-template-rows: 4rem 1fr 4rem;
  grid-template-areas:
    " map  region "
    " map    .    "
    " map  submit ";
`;

interface IMapModalProps {
  close: () => void;
}

export const MapModal: FC<IMapModalProps> = ({ close }) => {
  const dispatch = useAppDispatch();
  const { search, weather } = useAppSelector((state) => state.today);

  const handleClickCity = (cityName: string) => {
    dispatch(changeSearchCity(cityName));
  };

  const handleClickChangeCity = () => {
    if (search) {
      dispatch(changeCity(search));
      close();
    }
  };

  return (
    <MapModalContainer w="100%" h="100%">
      <Box ga="map">
        <MapChart cityName={search} onClick={handleClickCity} />
      </Box>

      <Flex ga="region" a="center" j="space-around">
        <Text size="lg">{convertCityName(search)}</Text>
      </Flex>

      <Flex ga="submit" a="flex-end" j="flex-end">
        <Button size="md" weight="bold" disabled={weather?.city?.name === search} onClick={handleClickChangeCity}>
          변경
        </Button>
      </Flex>
    </MapModalContainer>
  );
};
