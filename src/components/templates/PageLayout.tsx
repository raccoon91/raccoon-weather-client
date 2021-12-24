import { FC } from "react";
import { Box, Flex } from "components/atoms";

interface IPageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: FC<IPageLayoutProps> = ({ children }) => {
  return (
    <Box w="100vw" h="100vh" bgc="background">
      <Flex d="column" a="center" j="center" w="100%" maxw="1920px" h="100%" m="0 auto" bgc="skyBlue">
        {children}
      </Flex>
    </Box>
  );
};
