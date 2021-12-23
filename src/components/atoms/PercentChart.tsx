import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "./Box";

interface IStyledPercentChartProps {
  width: number;
  percent: number;
  color?: string;
}
const StyledPercentChart = styled.div<IStyledPercentChartProps>`
  overflow: hidden;
  position: relative;
  width: ${({ width }) => `${width - 1}%`};
  height: 1.2rem;
  background-color: ${({ theme }) => theme.color.gray};
  border-radius: 0.6rem;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: ${({ percent }) => `${percent}%`};
    height: 1.2rem;
    background-color: ${({ color, theme }) => color || theme.color.blue};
  }
`;

interface IStyledPercentChartTickProps {
  position: number;
}
const StyledPercentChartTick = styled.p<IStyledPercentChartTickProps>`
  position: absolute;
  left: ${({ position }) => `${position}%`};
  top: -1.8rem;
  width: 1.8rem;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.color.darkGray};
  font-size: ${({ theme }) => theme.textSize.xs};
  font-weight: bold;
  text-align: center;
  user-select: none;
`;

interface IPercentChartProps {
  chartData: number;
  chartRange: number[];
  chartColor?: string[];
}

export const PercentChart: FC<IPercentChartProps> = ({ chartData, chartRange, chartColor }) => {
  const [percentList, setPercentList] = useState<number[] | null>(null);
  const [chartLength, setChartLenth] = useState<number | null>(null);

  useEffect(() => {
    if (chartData && chartRange) {
      let chartValue = chartData;
      const chartLength = chartRange.length - 1;
      const percentList = Array.from({ length: chartLength }, () => 0);

      for (let i = 0; i < percentList.length; i++) {
        const rangeValue = chartRange[i + 1] - chartRange[i];

        if (chartValue > rangeValue) {
          chartValue -= rangeValue;
          percentList[i] = 100;
        } else {
          percentList[i] = Math.floor((chartValue / rangeValue) * 100);
          break;
        }
      }

      setChartLenth(chartLength);
      setPercentList(percentList);
    }
  }, [chartData, chartRange]);

  return (
    <Box po="relative" fd="row" j="space-between" w="100%" h="1.2rem">
      {percentList &&
        chartLength &&
        percentList.map((percent, index) => (
          <StyledPercentChart
            key={`pc-${index}`}
            width={Math.floor(100 / chartLength)}
            percent={percent}
            color={chartColor && chartColor[index]}
          />
        ))}

      {chartLength &&
        chartRange.map((data, index) => (
          <StyledPercentChartTick key={`act-${index}`} position={index * Math.floor(100 / chartLength)}>
            {data}
          </StyledPercentChartTick>
        ))}
    </Box>
  );
};
