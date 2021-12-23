import { FC } from "react";
import { useDispatch } from "react-redux";
import { changeCity } from "stores/slices";
import { MapChart } from "components/atoms";

export const MapModal: FC = () => {
  const dispatch = useDispatch();

  const handleClickCity = (city: string) => {
    dispatch(changeCity(city));
  };

  return <MapChart onClick={handleClickCity} />;
};
