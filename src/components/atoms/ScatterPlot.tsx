import { FC, useRef, useEffect, useLayoutEffect } from "react";
import { parseDatasets, drawYAxis, drawXAxis, drawYTick, drawXTick, drawDot } from "utils";
import { Box } from "./Box";

const canvasPadding = 10;
const yAxisWidth = 20;
const xAxisHeight = 10;
const chartPadding = 10;

const drawScatterPlot = (box: HTMLDivElement, canvas: HTMLCanvasElement, datasets: IChartData[]) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

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
};

interface IScatterPlotProps {
  datasets: IChartData[];
}

export const ScatterPlot: FC<IScatterPlotProps> = ({ datasets }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets.length) {
      drawScatterPlot(box, canvas, datasets);
    }
  }, [boxRef.current, canvasRef.current, datasets]);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets.length) {
      const redrawScatterPlot = () => {
        drawScatterPlot(box, canvas, datasets);
      };

      window.addEventListener("resize", redrawScatterPlot);

      return () => {
        window.removeEventListener("resize", redrawScatterPlot);
      };
    }
  }, [boxRef.current, canvasRef.current, datasets]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
