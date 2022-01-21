import { FC } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "hooks";
import { Grid, Box, Flex, Text, Image, Button, MapChart } from "components/atoms";
import { changeCity } from "stores/slices/todaySlice";
import { convertCityName } from "utils";
import ArrowRight from "images/arrow-right.svg";

const MapModalContainer = styled(Grid)`
  @media ${({ theme }) => theme.device.desktop} {
    grid-template-columns: calc(100% - 10rem) 10rem;
    grid-template-rows: 4rem 1fr 4rem;
    grid-template-areas:
      " map  region "
      " map    .    "
      " map  submit ";
  }

  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 12rem calc(100% - 24rem) 12rem;
    grid-template-rows: 2rem 2rem calc(100% - 8rem) 4rem;
    grid-template-areas:
      "  .  region  .  "
      "  .    .     .  "
      " map  map  map  "
      "  .    .  submit";

    ${Text} {
      font-size: 2.4rem;
    }
  }
`;

export const MapModal: FC = () => {
  const dispatch = useAppDispatch();
  const { search, weather } = useAppSelector((state) => state.today);

  const handleClickCity = (cityName: string) => {
    dispatch(changeCity(cityName));
  };

  return (
    <MapModalContainer w="100%" h="100%">
      <Box ga="map">
        <MapChart cityName={search} onClick={handleClickCity} />
      </Box>

      <Flex ga="region" a="center" j="space-around">
        <Text size="md">{weather?.city?.korName}</Text>

        {weather?.city?.name !== search ? (
          <>
            <Image src={ArrowRight} size={2} />
            <Text size="md">{convertCityName(search)}</Text>
          </>
        ) : null}
      </Flex>

      <Flex ga="submit" a="flex-end" j="flex-end">
        {weather?.city?.name !== search ? (
          <Button size="md" weight="bold">
            변경
          </Button>
        ) : null}
      </Flex>
    </MapModalContainer>
  );
};
