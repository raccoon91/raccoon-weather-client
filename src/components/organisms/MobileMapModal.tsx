import { FC } from "react";
import { useDispatch } from "react-redux";
import { changeCity } from "stores/slices/todaySlice";
import { Box, Flex, Image, MapChart } from "components/atoms";
import CloseIcon from "images/close.svg";

interface IMobileMapModalProps {
  onClose: () => void;
}

export const MobileMapModal: FC<IMobileMapModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    onClose();
  };

  const handleClickCity = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <Box po="fixed" t="0" l="0" w="100vw" h="100vh" z="10" bgc="white">
      <Flex j="flex-end" p="2rem">
        <Image src={CloseIcon} size={4} alt="모달 닫기 버튼" cursor="pointer" onClick={handleCloseModal} />
      </Flex>

      <Box h="calc(100% - 15rem)" p="3rem 3rem 1rem" bgc="skyBlue">
        <MapChart onClick={handleClickCity} />
      </Box>
    </Box>
  );
};
