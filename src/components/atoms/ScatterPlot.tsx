import { FC, useRef, useEffect } from "react";
import styled from "styled-components";
import { parseDatasets, drawYAxis, drawXAxis, drawYTick, drawXTick, drawDot } from "utils";

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

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
      const endX = clientWidth - canvasPadding;
      const endY = clientHeight - canvasPadding - xAxisHeight;
      const chartWidth = clientWidth - 2 * canvasPadding - yAxisWidth;
      const chartHeight = clientHeight - 2 * canvasPadding - xAxisHeight;

      drawYAxis(ctx, originX, originY, endY);
      drawXAxis(ctx, originX, endX, endY);

      for (let i = 0; i < datasets.length; i++) {
        const calibrationX = Math.floor(((datasets[i].x - minX) * (chartWidth - 2 * chartPadding)) / rangeX);
        const calibrationY = Math.floor(((datasets[i].value - minY) * (chartHeight - 2 * chartPadding)) / rangeY);
        const positionX = calibrationX + originX + chartPadding;
        const positionY = endY - chartPadding - calibrationY;

        drawDot(ctx, positionX, positionY);
      }

      for (let value = minY; value <= maxY; value += 10) {
        const calibrationY = Math.floor(((value - minY) * (chartHeight - 2 * chartPadding)) / rangeY);
        const positionY = endY - chartPadding - calibrationY;

        drawYTick(ctx, originX, positionY, String(value));
      }

      for (let value = minX; value <= maxX; value += 2) {
        const calibrationX = Math.floor(((value - minX) * (chartWidth - 2 * chartPadding)) / rangeX);
        const positionX = calibrationX + originX + chartPadding;

        drawXTick(ctx, positionX, endY, String(value).slice(2));
      }

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
