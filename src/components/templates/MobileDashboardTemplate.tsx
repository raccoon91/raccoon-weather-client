import React, { FC } from "react";

import { Box } from "components/atoms";

interface IMobileDashboardTemplateProps {
  children: React.ReactNode;
}

export const MobileDashboardTemplate: FC<IMobileDashboardTemplateProps> = ({ children }) => {
  return (
    <Box h="calc(100% - 7rem)" p="0 0 1rem">
      {children}
    </Box>
  );
};
