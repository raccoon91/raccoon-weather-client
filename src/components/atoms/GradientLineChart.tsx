import { FC, useRef, useEffect } from "react";
import styled from "styled-components";
import { parseDatasets, drawYAxis, drawXAxis, drawYTick, drawXTick, drawDot, drawLine } from "utils";

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface IGradientLineChartProps {
  datasets: IGlobalSurfaceAirTempData[];
}

export const GradientLineChart: FC<IGradientLineChartProps> = ({ datasets }) => {
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
      const yAxisWidth = 15;
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

      for (let i = 1; i < datasets.length; i++) {
        if (i < datasets.length) {
          const startValue = datasets[i - 1].value;
          const endValue = datasets[i].value;

          const calibrationStartX = Math.floor(((datasets[i - 1].x - minX) * (chartWidth - 2 * chartPadding)) / rangeX);
          const calibrationStartY = Math.floor(((startValue - minY) * (chartHeight - 2 * chartPadding)) / rangeY);
          const positionStartX = calibrationStartX + originX + chartPadding;
          const positionStartY = endY - chartPadding - calibrationStartY;

          const calibrationEndX = Math.floor(((datasets[i].x - minX) * (chartWidth - 2 * chartPadding)) / rangeX);
          const calibrationEndY = Math.floor(((endValue - minY) * (chartHeight - 2 * chartPadding)) / rangeY);
          const positionEndX = calibrationEndX + originX + chartPadding;
          const positionEndY = endY - chartPadding - calibrationEndY;

          drawDot(ctx, positionStartX, positionStartY);

          if (startValue <= 0 && endValue <= 0) {
            drawLine(ctx, positionStartX, positionStartY, positionEndX, positionEndY, "blue");
          } else if (startValue >= 0 && endValue >= 0) {
            drawLine(ctx, positionStartX, positionStartY, positionEndX, positionEndY, "red");
          } else {
            const calibrationZeroY = Math.floor(((0 - minY) * (chartHeight - 2 * chartPadding)) / rangeY);
            const positionZeroY = endY - chartPadding - calibrationZeroY;
            const positionZeroX =
              ((positionZeroY - positionStartY) * (positionEndX - positionStartX)) / (positionEndY - positionStartY) +
              positionStartX;

            if (startValue > endValue) {
              drawLine(ctx, positionStartX, positionStartY, positionZeroX, positionZeroY, "red");
              drawLine(ctx, positionZeroX, positionZeroY, positionEndX, positionEndY, "blue");
            } else {
              drawLine(ctx, positionStartX, positionStartY, positionZeroX, positionZeroY, "blue");
              drawLine(ctx, positionZeroX, positionZeroY, positionEndX, positionEndY, "red");
            }
          }
        } else {
          const calibrationX = Math.floor(((datasets[i].x - minX) * (chartWidth - 2 * chartPadding)) / rangeX);
          const calibrationY = Math.floor(((datasets[i].value - minY) * (chartHeight - 2 * chartPadding)) / rangeY);
          const positionX = calibrationX + originX + chartPadding;
          const positionY = endY - chartPadding - calibrationY;

          drawDot(ctx, positionX, positionY);
        }
      }

      for (let value = -0.5; value <= 1; value += 0.5) {
        const calibrationY = Math.floor(((value - minY) * (chartHeight - 2 * chartPadding)) / rangeY);
        const positionY = endY - chartPadding - calibrationY;

        drawYTick(ctx, originX, positionY, String(value));
      }

      for (let value = minX; value <= maxX; value += 5) {
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
