import { FC, useRef, useEffect, useLayoutEffect } from "react";
import {
  parseDatasets,
  getCanvasPostion,
  getCalibration,
  drawYAxis,
  drawXAxis,
  drawYTick,
  drawXTick,
  drawBar,
} from "utils";
import { Box } from "./Box";

const barChartDefaultOptions = {
  canvasPadding: 10,
  yAxisWidth: 20,
  xAxisHeight: 10,
  chartPadding: 0,
};

const drawBarChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  datasets: IChartData[],
  canvasOptions: ICanvasOptions,
  hoverId?: number
) => {
  const { clientWidth, clientHeight } = box;
  const { canvasPadding, yAxisWidth, chartPadding } = canvasOptions;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const barWidth = Math.floor((clientWidth - 2 * canvasPadding - yAxisWidth - 2 * chartPadding) / datasets.length);
  const dataRange = parseDatasets(datasets, { minY: 0 });
  const canvasPosition = getCanvasPostion(clientWidth, clientHeight, canvasOptions);

  const { minY, maxY, rangeY } = dataRange;
  const { originX, originY, endX, endY, chartHeight } = canvasPosition;

  drawYAxis(ctx, originX, originY, endY);
  drawXAxis(ctx, originX, endX, endY);

  for (let i = 0; i < datasets.length; i++) {
    const calibrationX = i * barWidth;
    const calibrationY = getCalibration(datasets[i].value - minY, chartHeight - 2 * chartPadding, rangeY);
    const positionX = calibrationX + originX;
    const positionY = endY - chartPadding - calibrationY;
    const middleX = positionX + Math.floor(barWidth / 2);
    const height = calibrationY + chartPadding;

    const barOptions = {
      barColor: "blue",
      barAlpha: i === hoverId ? 0.7 : 0.3,
      strokeColor: "blue",
      strokeAlpha: i === hoverId ? 0.7 : 0.5,
      strokeWidth: 0.5,
    };

    drawBar(ctx, positionX, positionY, barWidth, height, barOptions);
    drawXTick(ctx, middleX, endY, String(datasets[i].x).slice(2));
  }

  for (let value = minY; value <= maxY; value += 10) {
    const calibrationY = getCalibration(value - minY, chartHeight - 2 * chartPadding, rangeY);
    const positionY = endY - chartPadding - calibrationY;

    drawYTick(ctx, originX, positionY, String(value));
  }
};

const barChartMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  datasets: IChartData[],
  canvasOptions: ICanvasOptions
) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;
  const { clientWidth, clientHeight } = box;
  const { canvasPadding, yAxisWidth, chartPadding } = canvasOptions;

  const barWidth = Math.floor((clientWidth - 2 * canvasPadding - yAxisWidth - 2 * chartPadding) / datasets.length);
  const dataRange = parseDatasets(datasets, { minY: 0 });
  const canvasPosition = getCanvasPostion(clientWidth, clientHeight, canvasOptions);

  const { minY, rangeY } = dataRange;
  const { originX, endY, chartHeight } = canvasPosition;

  let hoverId: number | undefined;

  for (let i = 0; i < datasets.length; i++) {
    const calibrationX = i * barWidth;
    const calibrationY = getCalibration(datasets[i].value - minY, chartHeight - 2 * chartPadding, rangeY);
    const positionX = calibrationX + originX;
    const positionY = endY - chartPadding - calibrationY;
    const height = calibrationY + chartPadding;

    if (mouseX > positionX && mouseX < positionX + barWidth && mouseY > positionY && mouseY < positionY + height) {
      hoverId = i;
      break;
    }
  }

  drawBarChart(box, canvas, datasets, canvasOptions, hoverId);
};

interface IBarChartProps {
  datasets: IChartData[];
  canvasOptions?: ICanvasOptions;
}

export const BarChart: FC<IBarChartProps> = ({ datasets, canvasOptions = barChartDefaultOptions }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets.length) {
      drawBarChart(box, canvas, datasets, canvasOptions);

      canvas.onmousemove = (event: MouseEvent) => {
        barChartMouseOver(event, box, canvas, datasets, canvasOptions);
      };
    }
  }, [boxRef.current, canvasRef.current, datasets]);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets.length) {
      const redrawBarChart = () => {
        drawBarChart(box, canvas, datasets, canvasOptions);
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
