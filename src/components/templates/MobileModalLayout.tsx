import React, { FC } from "react";
import { Box, Image } from "components/atoms";
import { MobileNavigation } from "components/molecules";
import CloseIcon from "images/close.svg";

interface IMobileModalLayoutProps {
  children: React.ReactNode;
  close: () => void;
}

export const MobileModalLayout: FC<IMobileModalLayoutProps> = ({ children, close }) => {
  return (
    <Box po="fixed" t="0" l="0" a="center" j="center" w="100vw" h="100vh" z="10">
      <Box po="relative" w="100%" h="calc(100% - 7rem)" bgc="white" z="5">
        <Box fd="row" j="flex-end" h="4rem" m="2rem 0 0" p="0 2rem">
          <Image src={CloseIcon} size={4} alt="모달 닫기 버튼" cursor="pointer" onClick={close} />
        </Box>

        <Box h="calc(100% - 6rem)" m="2rem 0 0" p="3rem" bgc="skyBlue">
          {children}
        </Box>
      </Box>

      <Box w="100%" h="7rem">
        <MobileNavigation />
      </Box>
    </Box>
  );
};
