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
  originX: number,
  reverseOriginY: number,
  chartWidth: number,
  chartHeight: number,
  chartPadding: number,
  minX: number,
  minY: number,
  rangeX: number,
  rangeY: number
) => {
  for (let i = 0; i < datasets.length; i++) {
    const x = Math.floor(((datasets[i].x - minX) * (chartWidth - 2 * chartPadding)) / rangeX);
    const y = Math.floor(((datasets[i].value - minY) * (chartHeight - 2 * chartPadding)) / rangeY);
    const positionX = x + originX + chartPadding;
    const positionY = reverseOriginY - chartPadding - y;

    ctx.beginPath();
    ctx.arc(positionX, positionY, 3, 0, Math.PI * 2);
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

      const originX = canvasPadding + yAxisWidth;
      const originY = canvasPadding;
      const reverseOriginY = clientHeight - canvasPadding - xAxisHeight;
      const endX = clientWidth - canvasPadding;
      const endY = clientHeight - canvasPadding - xAxisHeight;
      const positionX = canvasPadding + yAxisWidth;
      const positionY = clientHeight - canvasPadding - xAxisHeight;
      const chartWidth = clientWidth - 2 * canvasPadding - yAxisWidth;
      const chartHeight = clientHeight - 2 * canvasPadding - xAxisHeight;

      drawYAxis(ctx, originY, endY, positionX, chartHeight, chartPadding, minY, maxY);
      drawXAxis(ctx, originX, endX, positionY, chartWidth, chartPadding, minX, maxX);
      drawScatterPlot(
        ctx,
        datasets,
        originX,
        reverseOriginY,
        chartWidth,
        chartHeight,
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
