import { FC, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { toDecimal } from "utils";
import { Flex } from "./Flex";

const fillChart = (percent: number) => keyframes`
  0% { width: 0%; }
  100% { width: ${percent}% }
`;

interface IStyledProgressChartProps {
  width: number;
  percent: number;
  delay?: number;
  color?: string;
}
const StyledProgressChart = styled.div<IStyledProgressChartProps>`
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
    height: 1.2rem;
    background-color: ${({ color, theme }) => color || theme.color.blue};
    animation: ${({ percent, delay }) =>
      css`
        ${fillChart(percent)} 0.3s linear ${delay}s forwards
      `};
  }
`;

interface IStyledProgressTickProps {
  position: number;
}
const StyledProgressTick = styled.p<IStyledProgressTickProps>`
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

interface IProgress {
  width: number;
  percent: number;
  delay?: number;
  color: string;
}

interface ITick {
  tick: number;
  position: number;
}

interface IProgressChartProps {
  chartData?: number;
  chartOptions: {
    range: number[];
    colors: string | string[];
    defaultTicks?: number[];
  };
}

export const ProgressChart: FC<IProgressChartProps> = ({ chartData = 0, chartOptions }) => {
  const [progressList, setProgressList] = useState<IProgress[] | null>(null);
  const [tickList, setTickList] = useState<ITick[] | null>(null);
  const [defaultTickList, setDefaultTickList] = useState<ITick[] | null>(null);

  useEffect(() => {
    if (chartOptions) {
      const { range, colors, defaultTicks } = chartOptions;
      const width = toDecimal(100 / (range.length - 1));
      const progressList = [];
      const tickList = [];
      let chartValue = chartData - range[0];
      const defaultTickList =
        defaultTicks?.map((tick) => ({
          tick,
          position: toDecimal(((tick - range[0]) * 100) / (range[range.length - 1] - range[0])),
        })) || null;

      for (let i = 0; i < range.length; i++) {
        if (i < range.length - 1) {
          const rangeValue = range[i + 1] - range[i];
          const progress: IProgress = {
            width,
            percent: 0,
            delay: (i + 1) * 0.3,
            color: typeof colors === "string" ? colors : colors[i],
          };

          if (chartValue > rangeValue) {
            progress.percent = 100;
            chartValue -= rangeValue;
          } else {
            progress.percent = toDecimal((chartValue / rangeValue) * 100);
            chartValue = 0;
          }

          progressList.push(progress);
        }

        tickList.push({
          tick: range[i],
          position: i * width,
        });
      }

      setProgressList(progressList);
      setTickList(tickList);
      setDefaultTickList(defaultTickList);
    }
  }, [chartData, chartOptions]);

  return (
    <Flex po="relative" d="row" j="space-between" w="100%" h="1.2rem">
      {tickList?.map((data) => (
        <StyledProgressTick key={`ct-${data.tick}`} position={data.position}>
          {data.tick}
        </StyledProgressTick>
      )) || null}

      {defaultTickList?.map((data) => (
        <StyledProgressTick key={`cdt-${data.tick}`} position={data.position}>
          {data.tick}
        </StyledProgressTick>
      )) || null}

      {progressList?.map((progress, index) => (
        <StyledProgressChart
          key={`pc-${index}`}
          width={progress.width}
          percent={progress.percent}
          delay={progress?.delay}
          color={progress.color}
        />
      )) || null}
    </Flex>
  );
};
