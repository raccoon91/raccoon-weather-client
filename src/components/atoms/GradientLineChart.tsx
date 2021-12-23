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
  drawLine,
} from "utils";
import { Box } from "./Box";

const gradientLineDefaultOptions = {
  canvasPadding: 10,
  yAxisWidth: 15,
  xAxisHeight: 10,
  chartPadding: 10,
};

const drawGradientLineChart = (
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

  const dataRange = parseDatasets(datasets, { minY: -0.5, maxY: 1 });
  const canvasPosition = getCanvasPostion(clientWidth, clientHeight, canvasOptions);

  const { minX, maxX, minY } = dataRange;
  const { originX, originY, endX, endY } = canvasPosition;

  drawYAxis(ctx, originX, originY, endY);
  drawXAxis(ctx, originX, endX, endY);

  const redLineOptions = {
    color: "red",
  };

  const blueLineOptions = {
    color: "blue",
  };

  for (let i = 0; i < datasets.length; i++) {
    const { positionX, positionY } = getPositionXY(datasets[i], dataRange, canvasPosition, canvasOptions);

    const dotOptions = {
      size: i === hoverId ? 6 : 2,
      color: i === hoverId ? (datasets[i].value > 0 ? "red" : "blue") : "black",
      alpha: i === hoverId ? 0.7 : 0.3,
    };

    drawDot(ctx, positionX, positionY, dotOptions);

    if (i > 0 && i < datasets.length) {
      const { positionX: positionStartX, positionY: positionStartY } = getPositionXY(
        datasets[i - 1],
        dataRange,
        canvasPosition,
        canvasOptions
      );

      if (datasets[i - 1].value <= 0 && datasets[i].value <= 0) {
        drawLine(ctx, positionStartX, positionStartY, positionX, positionY, blueLineOptions);
      } else if (datasets[i - 1].value >= 0 && datasets[i].value >= 0) {
        drawLine(ctx, positionStartX, positionStartY, positionX, positionY, redLineOptions);
      } else {
        const positionZeroY = getPositionY(0, dataRange, canvasPosition, canvasOptions);
        const positionZeroX =
          ((positionZeroY - positionStartY) * (positionX - positionStartX)) / (positionY - positionStartY) +
          positionStartX;

        const startLineOptions: ILineOptions = {};
        const endLineOptions: ILineOptions = {};

        if (datasets[i - 1].value > datasets[i].value) {
          startLineOptions.color = "red";
          endLineOptions.color = "blue";
        } else {
          startLineOptions.color = "blue";
          endLineOptions.color = "red";
        }

        drawLine(ctx, positionStartX, positionStartY, positionZeroX, positionZeroY, startLineOptions);
        drawLine(ctx, positionZeroX, positionZeroY, positionX, positionY, endLineOptions);
      }
    }
  }

  for (let value = minY; value <= 1; value += 0.5) {
    const positionY = getPositionY(value, dataRange, canvasPosition, canvasOptions);

    drawYTick(ctx, originX, positionY, String(value));
  }

  let xTickSkip = 5;

  if (window.innerWidth > 1024) {
    xTickSkip = 5;
  } else {
    xTickSkip = 10;
  }

  for (let value = minX; value <= maxX; value += xTickSkip) {
    const positionX = getPositionX(value, dataRange, canvasPosition, canvasOptions);

    drawXTick(ctx, positionX, endY, String(value).slice(2));
  }
};

const gradientLineMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  datasets: IChartData[],
  canvasOptions: ICanvasOptions
) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;
  const { clientWidth, clientHeight } = box;

  const dataRange = parseDatasets(datasets, { minY: -0.5, maxY: 1 });
  const canvasPosition = getCanvasPostion(clientWidth, clientHeight, canvasOptions);

  let hoverId: number | undefined;

  for (let i = 0; i < datasets.length; i++) {
    const { positionX, positionY } = getPositionXY(datasets[i], dataRange, canvasPosition, canvasOptions);

    if (mouseX > positionX - 4 && mouseX < positionX + 4 && mouseY > positionY - 4 && mouseY < positionY + 4) {
      hoverId = i;
      break;
    }
  }

  drawGradientLineChart(box, canvas, datasets, canvasOptions, hoverId);
};

interface IGradientLineChartProps {
  datasets: IGlobalSurfaceAirTempData[];
  canvasOptions?: ICanvasOptions;
}

export const GradientLineChart: FC<IGradientLineChartProps> = ({
  datasets,
  canvasOptions = gradientLineDefaultOptions,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets.length) {
      drawGradientLineChart(box, canvas, datasets, canvasOptions);

      if (window.innerWidth > 1024) {
        canvas.onmousemove = (event: MouseEvent) => {
          gradientLineMouseOver(event, box, canvas, datasets, canvasOptions);
        };
      }

      const redrawGradientLineChart = () => {
        drawGradientLineChart(box, canvas, datasets, canvasOptions);
      };

      window.addEventListener("resize", redrawGradientLineChart);

      return () => {
        window.removeEventListener("resize", redrawGradientLineChart);
      };
    }
  }, [boxRef.current, canvasRef.current, datasets]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
