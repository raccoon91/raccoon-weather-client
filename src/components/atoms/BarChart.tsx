import { FC, useRef, useEffect, useLayoutEffect } from "react";
import { parseDatasets, drawYAxis, drawXAxis, drawYTick, drawXTick, drawBar } from "utils";
import { Box } from "./Box";

const canvasPadding = 10;
const yAxisWidth = 20;
const xAxisHeight = 10;
const chartPadding = 0;

const drawBarChart = (box: HTMLDivElement, canvas: HTMLCanvasElement, datasets: IChartData[]) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

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
};

interface IBarChartProps {
  datasets: IChartData[];
}

export const BarChart: FC<IBarChartProps> = ({ datasets }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets.length) {
      drawBarChart(box, canvas, datasets);
    }
  }, [boxRef.current, canvasRef.current, datasets]);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets.length) {
      const redrawBarChart = () => {
        drawBarChart(box, canvas, datasets);
      };

      window.addEventListener("resize", redrawBarChart);

      return () => {
        window.removeEventListener("resize", redrawBarChart);
      };
    }
  }, [boxRef.current, canvasRef.current, datasets]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
