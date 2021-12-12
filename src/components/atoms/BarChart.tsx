import { FC, useRef, useEffect } from "react";
import styled from "styled-components";
import { parseDatasets, drawYAxis, drawBarXAxis } from "utils";

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const drawBarChart = (
  ctx: CanvasRenderingContext2D,
  datasets: IChartData[],
  clientHeight: number,
  canvasPadding: number,
  yAxisWidth: number,
  xAxisHeight: number,
  chartPadding: number,
  barWidth: number,
  minY: number,
  rangeY: number
) => {
  const chartHeight = clientHeight - 2 * canvasPadding - xAxisHeight;
  const originX = canvasPadding + yAxisWidth;
  const reverseOriginY = clientHeight - canvasPadding - xAxisHeight;

  for (let i = 0; i < datasets.length; i++) {
    const y = Math.floor(((datasets[i].value - minY) * (chartHeight - 2 * chartPadding)) / rangeY);
    const positionX = i * barWidth + originX + chartPadding;
    const positionY = reverseOriginY - chartPadding - y;

    ctx.fillStyle = "blue";
    ctx.fillRect(positionX, positionY, barWidth, y + chartPadding);
  }
};

interface IBarChartProps {
  datasets: IChartData[];
}

export const BarChart: FC<IBarChartProps> = ({ datasets }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;

    if (wrapper && canvas && datasets.length) {
      const { clientWidth, clientHeight } = wrapper;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = clientWidth;
      canvas.height = clientHeight;

      const canvasPadding = 10;
      const yAxisWidth = 20;
      const xAxisHeight = 10;
      const chartPadding = 0;
      const barWidth = Math.floor((clientWidth - 2 * canvasPadding - yAxisWidth - 2 * chartPadding) / datasets.length);
      const { minX, maxX, minY, maxY } = parseDatasets(datasets);
      const rangeY = maxY - minY;

      drawYAxis(ctx, clientHeight, canvasPadding, yAxisWidth, xAxisHeight, chartPadding, minY, maxY);
      drawBarXAxis(
        ctx,
        clientWidth,
        clientHeight,
        canvasPadding,
        yAxisWidth,
        xAxisHeight,
        chartPadding,
        barWidth,
        minX,
        maxX
      );
      drawBarChart(
        ctx,
        datasets,
        clientHeight,
        canvasPadding,
        yAxisWidth,
        xAxisHeight,
        chartPadding,
        barWidth,
        minY,
        rangeY
      );

      return () => {
        ctx.clearRect(0, 0, clientWidth, clientHeight);
      };
    }
  }, [wrapperRef.current, canvasRef.current, datasets]);

  return (
    <CanvasWrapper ref={wrapperRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasWrapper>
  );
};
