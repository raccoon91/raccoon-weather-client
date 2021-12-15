import { FC, useRef, useEffect } from "react";
import styled from "styled-components";
import { parseDatasets, drawYAxis, drawXAxis, drawYTick, drawXTick, drawBar } from "utils";

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

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

      const { minY, maxY } = parseDatasets(datasets);
      const rangeY = maxY - minY;

      const originX = canvasPadding + yAxisWidth;
      const originY = canvasPadding;
      const endX = clientWidth - canvasPadding;
      const endY = clientHeight - canvasPadding - xAxisHeight;
      const chartHeight = clientHeight - 2 * canvasPadding - xAxisHeight;

      drawYAxis(ctx, originX, originY, endY);
      drawXAxis(ctx, originX, endX, endY);

      for (let i = 0; i < datasets.length; i++) {
        const calibrationX = i * barWidth;
        const calibrationY = Math.floor(((datasets[i].value - minY) * (chartHeight - 2 * chartPadding)) / rangeY);
        const positionX = calibrationX + originX;
        const positionY = endY - chartPadding - calibrationY;
        const middleX = positionX + Math.floor(barWidth / 2);
        const height = calibrationY + chartPadding;

        drawBar(ctx, positionX, positionY, barWidth, height);
        drawXTick(ctx, middleX, endY, String(datasets[i].x).slice(2));
      }

      for (let value = minY; value <= maxY; value += 10) {
        const calibrationY = Math.floor(((value - minY) * (chartHeight - 2 * chartPadding)) / rangeY);
        const positionY = endY - chartPadding - calibrationY;

        drawYTick(ctx, originX, positionY, String(value));
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
