import { FC, useRef, useEffect } from "react";
import styled from "styled-components";
import { parseDatasets, drawYAxis, drawXAxis } from "utils";

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const drawScatterPlot = (
  ctx: CanvasRenderingContext2D,
  datasets: IChartData[],
  clientWidth: number,
  clientHeight: number,
  canvasPadding: number,
  yAxisWidth: number,
  xAxisHeight: number,
  chartPadding: number,
  minX: number,
  minY: number,
  rangeX: number,
  rangeY: number
) => {
  const chartWidth = clientWidth - 2 * canvasPadding - yAxisWidth;
  const chartHeight = clientHeight - 2 * canvasPadding - xAxisHeight;
  const positionX = canvasPadding + yAxisWidth;
  const reversePositionY = clientHeight - canvasPadding - xAxisHeight;

  for (let i = 0; i < datasets.length; i++) {
    const x = Math.floor(((datasets[i].x - minX) * (chartWidth - 2 * chartPadding)) / rangeX);
    const y = Math.floor(((datasets[i].value - minY) * (chartHeight - 2 * chartPadding)) / rangeY);

    ctx.beginPath();
    ctx.arc(x + positionX + chartPadding, reversePositionY - chartPadding - y, 3, 0, Math.PI * 2);
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "blue";
    ctx.fill();
  }
};

interface IScatterPlotProps {
  datasets: IChartData[];
}

export const ScatterPlot: FC<IScatterPlotProps> = ({ datasets }) => {
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
      const chartPadding = 10;
      const { minX, maxX, minY, maxY } = parseDatasets(datasets);
      const rangeX = maxX - minX;
      const rangeY = maxY - minY;

      drawYAxis(ctx, clientHeight, canvasPadding, yAxisWidth, xAxisHeight, chartPadding, minY, maxY);
      drawXAxis(ctx, clientWidth, clientHeight, canvasPadding, yAxisWidth, xAxisHeight, chartPadding, minX, maxX);
      drawScatterPlot(
        ctx,
        datasets,
        clientWidth,
        clientHeight,
        canvasPadding,
        yAxisWidth,
        xAxisHeight,
        chartPadding,
        minX,
        minY,
        rangeX,
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
