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
  drawLine,
} from "utils";
import { Box } from "./Box";

const graientLineDefaultOptions = {
  canvasPadding: 10,
  yAxisWidth: 15,
  xAxisHeight: 10,
  chartPadding: 10,
};

const drawGradientLine = (
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

  const dataRange = parseDatasets(datasets, { minY: -0.5, maxY: 1 });
  const canvasPosition = getCanvasPostion(clientWidth, clientHeight, canvasOptions);

  const { minX, maxX, minY, rangeX, rangeY } = dataRange;
  const { originX, originY, endX, endY, chartWidth, chartHeight } = canvasPosition;

  drawYAxis(ctx, originX, originY, endY);
  drawXAxis(ctx, originX, endX, endY);

  const redLineOptions = {
    color: "red",
  };

  const blueLineOptions = {
    color: "blue",
  };

  for (let i = 0; i < datasets.length; i++) {
    const { calibrationX, calibrationY } = getCalibrationXY(datasets[i], dataRange, canvasPosition, canvasOptions);
    const positionX = calibrationX + originX + chartPadding;
    const positionY = endY - chartPadding - calibrationY;

    const dotOptions = {
      size: i === hoverId ? 6 : 2,
      color: i === hoverId ? (datasets[i].value > 0 ? "red" : "blue") : "black",
      alpha: i === hoverId ? 0.7 : 0.3,
    };

    drawDot(ctx, positionX, positionY, dotOptions);

    if (i > 0 && i < datasets.length) {
      const { calibrationX: calibrationStartX, calibrationY: calibrationStartY } = getCalibrationXY(
        datasets[i - 1],
        dataRange,
        canvasPosition,
        canvasOptions
      );
      const positionStartX = calibrationStartX + originX + chartPadding;
      const positionStartY = endY - chartPadding - calibrationStartY;

      if (datasets[i - 1].value <= 0 && datasets[i].value <= 0) {
        drawLine(ctx, positionStartX, positionStartY, positionX, positionY, blueLineOptions);
      } else if (datasets[i - 1].value >= 0 && datasets[i].value >= 0) {
        drawLine(ctx, positionStartX, positionStartY, positionX, positionY, redLineOptions);
      } else {
        const calibrationZeroY = getCalibration(0 - minY, chartHeight - 2 * chartPadding, rangeY);
        const positionZeroY = endY - chartPadding - calibrationZeroY;
        const positionZeroX =
          ((positionZeroY - positionStartY) * (positionX - positionStartX)) / (positionY - positionStartY) +
          positionStartX;

        if (datasets[i - 1].value > datasets[i].value) {
          drawLine(ctx, positionStartX, positionStartY, positionZeroX, positionZeroY, redLineOptions);
          drawLine(ctx, positionZeroX, positionZeroY, positionX, positionY, blueLineOptions);
        } else {
          drawLine(ctx, positionStartX, positionStartY, positionZeroX, positionZeroY, blueLineOptions);
          drawLine(ctx, positionZeroX, positionZeroY, positionX, positionY, redLineOptions);
        }
      }
    }
  }

  for (let value = minY; value <= 1; value += 0.5) {
    const calibrationY = getCalibration(value - minY, chartHeight - 2 * chartPadding, rangeY);
    const positionY = endY - chartPadding - calibrationY;

    drawYTick(ctx, originX, positionY, String(value));
  }

  for (let value = minX; value <= maxX; value += 5) {
    const calibrationX = getCalibration(value - minX, chartWidth - 2 * chartPadding, rangeX);
    const positionX = calibrationX + originX + chartPadding;

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
  const { chartPadding } = canvasOptions;

  const dataRange = parseDatasets(datasets, { minY: -0.5, maxY: 1 });
  const canvasPosition = getCanvasPostion(clientWidth, clientHeight, canvasOptions);

  const { originX, endY } = canvasPosition;

  let hoverId: number | undefined;

  for (let i = 0; i < datasets.length; i++) {
    const { calibrationX, calibrationY } = getCalibrationXY(datasets[i], dataRange, canvasPosition, canvasOptions);
    const positionX = calibrationX + originX + chartPadding;
    const positionY = endY - chartPadding - calibrationY;

    if (mouseX > positionX - 4 && mouseX < positionX + 4 && mouseY > positionY - 4 && mouseY < positionY + 4) {
      hoverId = i;
      break;
    }
  }

  drawGradientLine(box, canvas, datasets, canvasOptions, hoverId);
};

interface IGradientLineChartProps {
  datasets: IGlobalSurfaceAirTempData[];
  canvasOptions?: ICanvasOptions;
}

export const GradientLineChart: FC<IGradientLineChartProps> = ({
  datasets,
  canvasOptions = graientLineDefaultOptions,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets.length) {
      drawGradientLine(box, canvas, datasets, canvasOptions);

      canvas.onmousemove = (event: MouseEvent) => {
        gradientLineMouseOver(event, box, canvas, datasets, canvasOptions);
      };
    }
  }, [boxRef.current, canvasRef.current, datasets]);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets.length) {
      const redrawGradientLine = () => {
        drawGradientLine(box, canvas, datasets, canvasOptions);
      };

      window.addEventListener("resize", redrawGradientLine);

      return () => {
        window.removeEventListener("resize", redrawGradientLine);
      };
    }
  }, [boxRef.current, canvasRef.current, datasets]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
