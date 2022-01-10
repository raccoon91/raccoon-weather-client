import { FC } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useLayout } from "hooks";
import { Flex, Box, Image } from "components/atoms";
import CloseIcon from "images/close.svg";

export const ModalLayout: FC = () => {
  const navigate = useNavigate();
  const device = useLayout();

  const handleClickClose = () => {
    navigate(-1);
  };

  return device === "desktop" ? (
    <Flex po="fixed" t="0" l="0" a="center" j="center" w="100vw" h="100vh" z="10">
      <Box po="absolute" w="100%" h="100%" bgc="black" op="0.5" onClick={handleClickClose} />

      <Box po="relative" w="50%" minw="60rem" h="70%" z="5">
        <Box w="100%" h="100%" p="3rem" br="3rem" bgc="white">
          <Flex j="flex-end" h="3rem">
            <Image src={CloseIcon} size={3} alt="모달 닫기 버튼" cursor="pointer" onClick={handleClickClose} />
          </Flex>

          <Box h="calc(100% - 3rem)" p="2rem">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Flex>
  ) : (
    <Box po="fixed" t="0" l="0" w="100vw" h="100vh" z="10" bgc="white">
      <Flex j="flex-end" p="2rem">
        <Image src={CloseIcon} size={4} alt="모달 닫기 버튼" cursor="pointer" onClick={handleClickClose} />
      </Flex>

      <Box h="calc(100% - 15rem)" p="3rem 3rem 1rem" bgc="skyBlue">
        <Outlet />
      </Box>
    </Box>
  );
};
