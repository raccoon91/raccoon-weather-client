import { FC } from "react";
import { Box } from "components/atoms";

interface IPageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: FC<IPageLayoutProps> = ({ children }) => {
  return (
    <Box a="center" j="center" w="100vw" h="100vh" bgc="skyBlue">
      {children}
    </Box>
  );
};
