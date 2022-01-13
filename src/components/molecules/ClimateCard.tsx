import { FC } from "react";
import styled from "styled-components";
import { Box, Title3, Skeleton } from "components/atoms";

interface IClimateCardContainerProps {
  desktopOnly?: boolean;
}

const ClimateCardContainer = styled(Box)<IClimateCardContainerProps>`
  @media ${({ theme }) => theme.device.mobile} {
    ${({ desktopOnly }) => desktopOnly && `display: none;`}
  }
`;

interface IClimateCardProps {
  area?: string;
  isLoad: boolean;
  title: string;
  chart: React.ReactNode;
  desktopOnly?: boolean;
}

export const ClimateCard: FC<IClimateCardProps> = ({ area, isLoad, title, chart, desktopOnly }) => {
  return (
    <ClimateCardContainer ga={area} p="3rem" br="3rem" bgc="white" desktopOnly={desktopOnly}>
      {isLoad ? <Title3 size="sm">{title}</Title3> : <Skeleton w="10rem" h="1.6rem" />}

      <Box h="calc(100% - 2.6rem)" m="1rem 0 0">
        {isLoad ? chart : <Skeleton h="100%" />}
      </Box>
    </ClimateCardContainer>
  );
};
