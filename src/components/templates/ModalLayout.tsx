import React, { FC } from "react";
import { Flex, Box, Image } from "components/atoms";
import CloseIcon from "images/close.svg";

interface IModalLayoutProps {
  children: React.ReactNode;
  close: () => void;
}

export const ModalLayout: FC<IModalLayoutProps> = ({ children, close }) => {
  return (
    <Flex po="fixed" t="0" l="0" a="center" j="center" w="100vw" h="100vh" z="10">
      <Box po="absolute" w="100%" h="100%" bgc="black" op="0.5" onClick={close} />

      <Box po="relative" w="50%" minw="60rem" h="70%" z="5">
        <Box w="100%" h="100%" p="3rem" br="3rem" bgc="white">
          <Flex j="flex-end" h="3rem">
            <Image src={CloseIcon} size={3} alt="모달 닫기 버튼" cursor="pointer" onClick={close} />
          </Flex>

          <Box h="calc(100% - 3rem)" p="2rem">
            {children}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
