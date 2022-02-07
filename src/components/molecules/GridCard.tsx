import React, { FC } from "react";
import { Box, Flex, Title3, Caption, Skeleton } from "components/atoms";
import { UnitText } from "components/molecules";

interface IGridCardProps {
  area?: string;
  column?: string;
  row?: string;
  p?: string;
  isLoad: boolean;
  title: string;
  caption?: string | null;
  value?: number | string;
  unit?: string;
  chart: React.ReactNode;
}

export const GridCard: FC<IGridCardProps> = ({ area, column, row, p, isLoad, title, caption, value, unit, chart }) => {
  return (
    <Box className="card" ga={area} gc={column} gr={row} p={p || "3rem"} br="3rem" bgc="white">
      {isLoad ? (
        <Flex w="100%" h="1.6rem" j="space-between">
          <Title3 size="sm">{title}</Title3>

          {caption ? <Caption message={caption} /> : null}
        </Flex>
      ) : (
        <Skeleton w="10rem" h="1.6rem" />
      )}

      {unit ? (
        <Flex d="column" h="calc(100% - 2.6rem)" m="1rem 0 0">
          {isLoad ? <UnitText value={value} unit={unit} h="4rem" /> : <Skeleton w="8rem" h="4rem" m="0 auto" />}

          {isLoad ? <Box m="auto 0 0">{chart}</Box> : <Skeleton h="2rem" m="auto 0 0" />}
        </Flex>
      ) : (
        <Box h="calc(100% - 2.6rem)" m="1rem 0 0">
          {isLoad ? chart : <Skeleton h="100%" />}
        </Box>
      )}
    </Box>
  );
};
