import React, { FC } from "react";
import { Box, Card, Image } from "components/atoms";
import CloseIcon from "images/close.svg";

interface IModalLayoutProps {
  children: React.ReactNode;
  close: () => void;
}

export const ModalLayout: FC<IModalLayoutProps> = ({ children, close }) => {
  return (
    <Box po="fixed" t="0" l="0" a="center" j="center" w="100vw" h="100vh" z="10">
      <Box po="absolute" w="100%" h="100%" bgc="black" op="0.5" onClick={close} />

      <Box po="relative" w="50%" minw="60rem" h="70%" z="5">
        <Card w="100%" h="100%" p="2rem 3rem 3rem">
          <Box fd="row" j="flex-end" h="3rem">
            <Image src={CloseIcon} alt="모달 닫기 버튼" cursor="pointer" onClick={close} />
          </Box>

          <Box h="calc(100% - 5rem)" m="2rem 0 0">
            {children}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
