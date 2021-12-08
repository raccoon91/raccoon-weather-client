import { FC } from "react";
import styled from "styled-components";

interface IStyledTempChartProps {
  percent: number;
}
const StyledTempChart = styled.div<IStyledTempChartProps>`
  position: relative;
  width: 100%;
  height: 12px;
  background-color: ${({ theme }) => theme.color.gray};
  border-radius: 6px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: ${({ percent }) => `${percent}%`};
    height: 12px;
    background-color: ${({ theme }) => theme.color.blue};
    border-radius: 6px;
  }
`;

interface IStyledTempChartTickProps {
  position: string | number;
}
const StyledTempChartTick = styled.p<IStyledTempChartTickProps>`
  position: absolute;
  ${({ position }) => (position === "right" ? "left: 100%;" : position === "left" ? "left: 0;" : `left: ${position}%;`)}
  top: -16px;
  width: 18px;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.color.darkGray};
  font-size: ${({ theme }) => theme.textSize.xs};
  font-weight: bold;
  text-align: center;
  user-select: none;
`;

interface ITempChartProps {
  temp: number;
  min?: number;
  max?: number;
}

export const TempChart: FC<ITempChartProps> = ({ temp, min = -40, max = 50 }) => {
  return (
    <StyledTempChart percent={Math.floor(((temp - min) / 90) * 100)}>
      <StyledTempChartTick position="left">{min}</StyledTempChartTick>
      <StyledTempChartTick position={-min}>0</StyledTempChartTick>
      <StyledTempChartTick position="right">{max}</StyledTempChartTick>
    </StyledTempChart>
  );
};
