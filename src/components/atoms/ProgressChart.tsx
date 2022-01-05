import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { Flex } from "./Flex";

interface IStyledProgressChartProps {
  width: number;
  percent: number;
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
    width: ${({ percent }) => `${percent}%`};
    height: 1.2rem;
    background-color: ${({ color, theme }) => color || theme.color.blue};
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
  percent: number;
  width: number;
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
  };
}

export const ProgressChart: FC<IProgressChartProps> = ({ chartData = 0, chartOptions }) => {
  const [progressList, setProgressList] = useState<IProgress[] | null>(null);
  const [tickList, setTickList] = useState<ITick[] | null>(null);

  useEffect(() => {
    if (chartOptions) {
      const { range, colors } = chartOptions;
      const width = Math.floor(100 / (range.length - 1));
      const progressList = [];
      const tickList = [];
      let chartValue = chartData - range[0];

      for (let i = 0; i < range.length; i++) {
        if (i < range.length - 1) {
          const rangeValue = range[i + 1] - range[i];
          const progress: IProgress = {
            percent: 0,
            width,
            color: typeof colors === "string" ? colors : colors[i],
          };

          if (chartValue > rangeValue) {
            progress.percent = 100;
            chartValue -= rangeValue;
          } else {
            progress.percent = Math.floor((chartValue / rangeValue) * 100);
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
    }
  }, [chartData, chartOptions]);

  if (!progressList || !tickList) {
    return null;
  }

  return (
    <Flex po="relative" d="row" j="space-between" w="100%" h="1.2rem">
      {progressList.map((progress, index) => (
        <StyledProgressChart
          key={`pc-${index}`}
          width={progress.width}
          percent={progress.percent}
          color={progress.color}
        />
      ))}

      {tickList.map((data) => (
        <StyledProgressTick key={`act-${data.tick}`} position={data.position}>
          {data.tick}
        </StyledProgressTick>
      ))}
    </Flex>
  );
};
