import { FC } from "react";
import { Flex } from "components/atoms";

interface IPageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: FC<IPageLayoutProps> = ({ children }) => {
  return (
    <Flex d="column" a="center" j="center" w="100vw" h="100vh" bgc="skyBlue">
      {children}
    </Flex>
  );
};
