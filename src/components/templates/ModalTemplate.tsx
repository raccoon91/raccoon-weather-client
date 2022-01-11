import React, { FC } from "react";
import { createPortal } from "react-dom";
import { Flex, Box, Image } from "components/atoms";
import CloseIcon from "images/close.svg";

const modal = document.getElementById("modal");

interface IModalTemplateProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

export const ModalTemplate: FC<IModalTemplateProps> = ({ isOpen, close, children }) => {
  const handleClickClose = () => {
    close();
  };

  if (!modal) return null;

  return createPortal(
    isOpen ? (
      <Flex po="fixed" t="0" l="0" a="center" j="center" w="100vw" h="100vh" z="10">
        <Box po="absolute" w="100%" h="100%" bgc="black" op="0.5" onClick={handleClickClose} />

        <Box po="relative" w="50%" minw="60rem" h="70%" z="5">
          <Box w="100%" h="100%" p="3rem" br="3rem" bgc="white">
            <Flex j="flex-end" h="3rem">
              <Image src={CloseIcon} size={3} alt="모달 닫기 버튼" cursor="pointer" onClick={handleClickClose} />
            </Flex>

            <Box h="calc(100% - 3rem)" p="2rem">
              {children}
            </Box>
          </Box>
        </Box>
      </Flex>
    ) : null,
    modal
  );
};
