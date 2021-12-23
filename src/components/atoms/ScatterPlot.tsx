import { FC, useRef, useEffect } from "react";
import {
  parseDatasets,
  getCanvasPostion,
  getPositionXY,
  getPositionX,
  getPositionY,
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
  const ctx = canvas.getContext("2d");

  if (!clientWidth || !clientHeight || !ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const dataRange = parseDatasets(datasets, { minY: -40, maxY: 50 });
  const canvasPosition = getCanvasPostion(clientWidth, clientHeight, canvasOptions);

  const { minX, maxX, minY, maxY } = dataRange;
  const { originX, originY, endX, endY } = canvasPosition;

  drawYAxis(ctx, originX, originY, endY);
  drawXAxis(ctx, originX, endX, endY);

  for (let i = 0; i < datasets.length; i++) {
    const { positionX, positionY } = getPositionXY(datasets[i], dataRange, canvasPosition, canvasOptions);

    const dotOptions = {
      size: i === hoverId ? 6 : 3,
      color: datasets[i].value > 35 ? "red" : "blue",
      alpha: i === hoverId ? 0.7 : 0.1,
    };

    drawDot(ctx, positionX, positionY, dotOptions);
  }

  for (let value = minY; value <= maxY; value += 10) {
    const positionY = getPositionY(value, dataRange, canvasPosition, canvasOptions);

    drawYTick(ctx, originX, positionY, String(value));
  }

  for (let value = minX; value <= maxX; value += 2) {
    const positionX = getPositionX(value, dataRange, canvasPosition, canvasOptions);

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

  const dataRange = parseDatasets(datasets, { minY: -40, maxY: 50 });
  const canvasPosition = getCanvasPostion(clientWidth, clientHeight, canvasOptions);

  let hoverId: number | undefined;

  for (let i = 0; i < datasets.length; i++) {
    const { positionX, positionY } = getPositionXY(datasets[i], dataRange, canvasPosition, canvasOptions);

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

      if (window.innerWidth > 1024) {
        canvas.onmousemove = (event: MouseEvent) => {
          scatterPlotMouseOver(event, box, canvas, datasets, canvasOptions);
        };
      }

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
