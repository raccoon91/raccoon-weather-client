import React, { FC } from "react";
import { Box } from "components/atoms";

interface IDashboardTemplateProps {
  children: React.ReactNode;
}

export const DashboardTemplate: FC<IDashboardTemplateProps> = ({ children }) => {
  return <Box h="calc(100% - 4rem)">{children}</Box>;
};
