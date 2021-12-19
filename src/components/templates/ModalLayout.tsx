import React, { FC } from "react";
import { Box } from "components/atoms";

interface IModalLayoutProps {
  children: React.ReactNode;
  close: () => void;
}

export const ModalLayout: FC<IModalLayoutProps> = ({ children, close }) => {
  return (
    <Box po="fixed" t="0" l="0" a="center" j="center" w="100vw" h="100vh">
      <Box po="absolute" w="100%" h="100%" bgc="black" op="0.5" onClick={close} />

      <Box po="relative" w="50%" minw="60rem" h="70%" z="5">
        {children}
      </Box>
    </Box>
  );
};
