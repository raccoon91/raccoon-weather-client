import React, { FC } from "react";
import styled from "styled-components";
import { Box } from "components/atoms";

const DashboardTemplateContainer = styled(Box)`
  @media ${({ theme }) => theme.device.desktop} {
    height: calc(100% - 4rem);
  }

  @media ${({ theme }) => theme.device.mobile} {
    height: calc(100% - 7rem);
  }
`;

interface IDashboardTemplateProps {
  children: React.ReactNode;
}

export const DashboardTemplate: FC<IDashboardTemplateProps> = ({ children }) => {
  return (
    <Box h="100%">
      <DashboardTemplateContainer>{children}</DashboardTemplateContainer>
    </Box>
  );
};
