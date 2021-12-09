import { FC } from "react";
import styled from "styled-components";

interface IStyledTempChartProps {
  percent: number;
}
const StyledTempChart = styled.div<IStyledTempChartProps>`
  position: relative;
  width: 100%;
  height: 1.2rem;
  background-color: ${({ theme }) => theme.color.gray};
  border-radius: 0.6rem;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: ${({ percent }) => `${percent}%`};
    height: 1.2rem;
    background-color: ${({ theme }) => theme.color.blue};
    border-radius: 0.6rem;
  }
`;

interface IStyledTempChartTickProps {
  position: string | number;
}
const StyledTempChartTick = styled.p<IStyledTempChartTickProps>`
  position: absolute;
  ${({ position }) => (position === "right" ? "left: 100%;" : position === "left" ? "left: 0;" : `left: ${position}%;`)}
  top: -1.6rem;
  width: 1.8rem;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.color.darkGray};
  font-size: ${({ theme }) => theme.textSize.xs};
  font-weight: bold;
  text-align: center;
  user-select: none;
`;

interface ITempChartProps {
  chartData: number;
  min?: number;
  max?: number;
}

export const TempChart: FC<ITempChartProps> = ({ chartData, min = -40, max = 50 }) => {
  return (
    <StyledTempChart percent={Math.floor(((chartData - min) / 90) * 100)}>
      <StyledTempChartTick position="left">{min}</StyledTempChartTick>
      <StyledTempChartTick position={-min}>0</StyledTempChartTick>
      <StyledTempChartTick position="right">{max}</StyledTempChartTick>
    </StyledTempChart>
  );
};
