import { FC, useRef, useEffect, useLayoutEffect } from "react";
import {
  parseDatasets,
  getCanvasPostion,
  getCalibrationXY,
  getCalibration,
  drawYAxis,
  drawXAxis,
  drawYTick,
  drawXTick,
  drawDot,
} from "utils";
import { Box } from "./Box";

const scatterPlotDefaultOptions = {
  canvasPadding: 10,
  yAxisWidth: 20,
  xAxisHeight: 10,
  chartPadding: 10,
};

const drawScatterPlot = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  datasets: IChartData[],
  canvasOptions: ICanvasOptions,
  hoverId?: number
) => {
  const { clientWidth, clientHeight } = box;
  const { chartPadding } = canvasOptions;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const dataRange = parseDatasets(datasets, { minY: -40, maxY: 50 });
  const canvasPosition = getCanvasPostion(clientWidth, clientHeight, canvasOptions);

  const { minX, maxX, minY, maxY, rangeX, rangeY } = dataRange;
  const { originX, originY, endX, endY, chartWidth, chartHeight } = canvasPosition;

  drawYAxis(ctx, originX, originY, endY);
  drawXAxis(ctx, originX, endX, endY);

  for (let i = 0; i < datasets.length; i++) {
    const { calibrationX, calibrationY } = getCalibrationXY(datasets[i], dataRange, canvasPosition, canvasOptions);
    const positionX = calibrationX + originX + chartPadding;
    const positionY = endY - chartPadding - calibrationY;

    const dotOptions = {
      size: i === hoverId ? 6 : 3,
      color: datasets[i].value > 35 ? "red" : "blue",
      alpha: i === hoverId ? 0.7 : 0.1,
    };

    drawDot(ctx, positionX, positionY, dotOptions);
  }

  for (let value = minY; value <= maxY; value += 10) {
    const calibrationY = getCalibration(value - minY, chartHeight - 2 * chartPadding, rangeY);
    const positionY = endY - chartPadding - calibrationY;

    drawYTick(ctx, originX, positionY, String(value));
  }

  for (let value = minX; value <= maxX; value += 2) {
    const calibrationX = getCalibration(value - minX, chartWidth - 2 * chartPadding, rangeX);
    const positionX = calibrationX + originX + chartPadding;

    drawXTick(ctx, positionX, endY, String(value).slice(2));
  }
};

const scatterPlotMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  datasets: IChartData[],
  canvasOptions: ICanvasOptions
) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;
  const { clientWidth, clientHeight } = box;
  const { chartPadding } = canvasOptions;

  const dataRange = parseDatasets(datasets, { minY: -40, maxY: 50 });
  const canvasPosition = getCanvasPostion(clientWidth, clientHeight, canvasOptions);

  const { originX, endY } = canvasPosition;

  let hoverId: number | undefined;

  for (let i = 0; i < datasets.length; i++) {
    const { calibrationX, calibrationY } = getCalibrationXY(datasets[i], dataRange, canvasPosition, canvasOptions);
    const positionX = calibrationX + originX + chartPadding;
    const positionY = endY - chartPadding - calibrationY;

    if (mouseX > positionX - 3 && mouseX < positionX + 3 && mouseY > positionY - 3 && mouseY < positionY + 3) {
      hoverId = i;
      break;
    }
  }

  drawScatterPlot(box, canvas, datasets, canvasOptions, hoverId);
};

interface IScatterPlotProps {
  datasets: IChartData[];
  canvasOptions?: ICanvasOptions;
}

export const ScatterPlot: FC<IScatterPlotProps> = ({ datasets, canvasOptions = scatterPlotDefaultOptions }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets.length) {
      drawScatterPlot(box, canvas, datasets, canvasOptions);

      canvas.onmousemove = (event: MouseEvent) => {
        scatterPlotMouseOver(event, box, canvas, datasets, canvasOptions);
      };
    }
  }, [boxRef.current, canvasRef.current, datasets]);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets.length) {
      const redrawScatterPlot = () => {
        drawScatterPlot(box, canvas, datasets, canvasOptions);
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
