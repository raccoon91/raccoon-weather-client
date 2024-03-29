import React, { FC } from "react";
import { createPortal } from "react-dom";
import { Flex, Box, Title3, Image } from "components/atoms";
import CloseIcon from "images/close.svg";

const modal = document.getElementById("modal");

interface IModalTemplateProps {
  title?: string;
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

export const ModalTemplate: FC<IModalTemplateProps> = ({ title, isOpen, close, children }) => {
  const handleClickClose = () => {
    close();
  };

  if (!modal) return null;

  return createPortal(
    isOpen ? (
      <Flex po="fixed" t="0" l="0" a="center" j="center" w="100vw" h="100vh" z="15">
        <Box po="absolute" w="100%" h="100%" bgc="black" op="0.5" onClick={handleClickClose} />

        <Box po="relative" w="70rem" h="50rem" z="5">
          <Box w="100%" h="100%" p="3rem" br="3rem" bgc="white">
            <Flex j="flex-start" h="3rem">
              {title ? <Title3>{title}</Title3> : null}

              <Image
                src={CloseIcon}
                size={3}
                alt="모달 닫기 버튼"
                cursor="pointer"
                m="0 0 0 auto"
                onClick={handleClickClose}
              />
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
