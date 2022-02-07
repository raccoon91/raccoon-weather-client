import { FC } from "react";
import styled from "styled-components";
import { Box, Flex, Title3, Caption, Skeleton } from "components/atoms";
import { UnitText } from "components/molecules";
import type { ReactNode, DragEventHandler } from "react";

interface IDraggableCardBoxProps {
  isOver?: boolean;
}

const DraggableCardBox = styled(Box)<IDraggableCardBoxProps>`
  position: relative;

  &::after {
    ${({ isOver, theme }) =>
      isOver &&
      `
      content: "";
      position: absolute;
      top: 15%;
      left: -1rem;
      height: 70%;
      border-left: 3px solid ${theme.color.blue};
    `}
  }
`;

interface IDraggableCardProps {
  index: number;
  enterIndex: number | null;
  area?: string;
  column?: string;
  row?: string;
  p?: string;
  isLoad: boolean;
  title: string;
  caption?: string | null;
  value?: number | string;
  unit?: string;
  chart: ReactNode;
  onDragStart: (startIndex: number) => void;
  onDragEnter: (enterIndex: number) => void;
  onDragEnd: () => void;
}

export const DraggableCard: FC<IDraggableCardProps> = ({
  index,
  enterIndex,
  area,
  column,
  row,
  p,
  isLoad,
  title,
  caption,
  value,
  unit,
  chart,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
  const handleDragStart: DragEventHandler<HTMLDivElement> = () => {
    onDragStart(index);
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = () => {
    onDragEnter(index);
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDragEnd: DragEventHandler<HTMLDivElement> = () => {
    onDragEnd();
  };

  return (
    <DraggableCardBox
      className="card"
      ga={area}
      gc={column}
      gr={row}
      p={p || "3rem"}
      br="3rem"
      bgc="white"
      isOver={index === enterIndex}
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
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
    </DraggableCardBox>
  );
};
