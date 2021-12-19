import { FC } from "react";
import { useDispatch } from "react-redux";
import { changeCity } from "stores/slices";
import { Card, Box, Image, MapChart } from "components/atoms";
import CloseIcon from "images/close.svg";

interface IMapModalProps {
  close: () => void;
}

export const MapModal: FC<IMapModalProps> = ({ close }) => {
  const dispatch = useDispatch();

  const handleClickCity = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <Card w="100%" h="100%" p="2rem 3rem 3rem">
      <Box fd="row" j="flex-end" h="3rem">
        <Image src={CloseIcon} alt="닫기 아이콘" cursor="pointer" onClick={close} />
      </Box>

      <Box h="calc(100% - 5rem)" m="2rem 0 0">
        <MapChart onClick={handleClickCity} />
      </Box>
    </Card>
  );
};
