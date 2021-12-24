import React, { FC } from "react";
import { Box, Flex, Image } from "components/atoms";
import { MobileNavigation } from "components/molecules";
import CloseIcon from "images/close.svg";

interface IMobileModalLayoutProps {
  children: React.ReactNode;
  close: () => void;
}

export const MobileModalLayout: FC<IMobileModalLayoutProps> = ({ children, close }) => {
  return (
    <Box po="fixed" t="0" l="0" w="100vw" h="100vh" z="10" bgc="white">
      <Flex j="flex-end" p="2rem">
        <Image src={CloseIcon} size={4} alt="모달 닫기 버튼" cursor="pointer" onClick={close} />
      </Flex>

      <Box h="calc(100% - 15rem)" p="3rem 3rem 1rem" bgc="skyBlue">
        {children}
      </Box>

      <Box h="7rem">
        <MobileNavigation />
      </Box>
    </Box>
  );
};
