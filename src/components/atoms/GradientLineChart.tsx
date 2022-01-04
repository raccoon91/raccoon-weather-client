import { FC, useRef, useEffect } from "react";
import {
  toDecimal,
  getDataRange,
  getCanvasPostion,
  drawYAxis,
  drawXAxis,
  drawYTick,
  drawXTick,
  drawDot,
  drawLine,
} from "utils";
import { chartTheme } from "configs";
import { Box } from "./Box";

const gradientLineDefaultOptions = {
  chart: {
    paddingX: 5,
    paddingY: 8,
    yAxisWidth: 25,
    xAxisHeight: 10,
  },
  draw: {
    paddingX: 0,
    paddingY: 10,
  },
  dataRange: {
    min: -0.5,
    max: 1,
  },
};

const drawGradientLineChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[],
  options: ICanvasOptions,
  hoverId?: number
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const { min, range } = getDataRange(datasets, options.dataRange);
  const { startX, startY, endX, endY, drawStartX, drawEndY, drawWidth, drawHeight } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

  drawYAxis(ctx, startX, startY, endY);
  drawXAxis(ctx, startX, endX, endY);

  const redLineOptions = { color: chartTheme.red };
  const blueLineOptions = { color: chartTheme.blue };

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
    const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

    const dotOptions = {
      size: i === hoverId ? 6 : 2,
      color: i === hoverId ? (datasets[i] > 0 ? chartTheme.red : chartTheme.blue) : chartTheme.black,
      alpha: i === hoverId ? 1 : 0.3,
    };

    drawDot(ctx, positionX, positionY, dotOptions);

    if (i > 0) {
      const positionStartX = (i - 1) * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
      const positionStartY = drawEndY - toDecimal(((datasets[i - 1] - min) * drawHeight) / range);

      if (datasets[i - 1] <= 0 && datasets[i] <= 0) {
        drawLine(ctx, positionStartX, positionStartY, positionX, positionY, blueLineOptions);
      } else if (datasets[i - 1] >= 0 && datasets[i] >= 0) {
        drawLine(ctx, positionStartX, positionStartY, positionX, positionY, redLineOptions);
      } else {
        const positionZeroY = drawEndY - toDecimal(((0 - min) * drawHeight) / range);
        const positionZeroX =
          ((positionZeroY - positionStartY) * (positionX - positionStartX)) / (positionY - positionStartY) +
          positionStartX;

        const startLineOptions: ILineOptions = {};
        const endLineOptions: ILineOptions = {};

        if (datasets[i - 1] > datasets[i]) {
          startLineOptions.color = chartTheme.red;
          endLineOptions.color = chartTheme.blue;
        } else {
          startLineOptions.color = chartTheme.blue;
          endLineOptions.color = chartTheme.red;
        }

        drawLine(ctx, positionStartX, positionStartY, positionZeroX, positionZeroY, startLineOptions);
        drawLine(ctx, positionZeroX, positionZeroY, positionX, positionY, endLineOptions);
      }
    }
  }

  for (let value = min; value <= 1; value += 0.5) {
    const positionY = drawEndY - toDecimal(((value - min) * drawHeight) / range);

    drawYTick(ctx, startX, positionY, String(value));
  }

  let xTickSkip = 1;

  if (window.innerWidth > 1024) {
    xTickSkip = Math.ceil(labels.length / 16);
  } else {
    xTickSkip = Math.ceil(labels.length / 10);
  }

  for (let i = 0; i < labels.length; i += xTickSkip) {
    const middleX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    drawXTick(ctx, middleX, endY, labels[i].slice(2));
  }
};

const gradientLineMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[],
  options: ICanvasOptions
) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const { min, range } = getDataRange(datasets, options.dataRange);
  const { drawStartX, drawEndY, drawWidth, drawHeight } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

  let hoverId: number | undefined;

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
    const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

    if (mouseX > positionX - 4 && mouseX < positionX + 4 && mouseY > positionY - 4 && mouseY < positionY + 4) {
      hoverId = i;
      break;
    }
  }

  drawGradientLineChart(box, canvas, labels, datasets, options, hoverId);
};

interface IGradientLineChartProps {
  labels: string[];
  datasets: number[];
  options?: ICanvasOptions;
}

export const GradientLineChart: FC<IGradientLineChartProps> = ({
  labels,
  datasets,
  options = gradientLineDefaultOptions,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && labels.length && datasets.length) {
      const gradientLineOptions = {
        chart: { ...gradientLineDefaultOptions.chart, ...options.chart },
        draw: { ...gradientLineDefaultOptions.draw, ...options.draw },
        dataRange: { ...gradientLineDefaultOptions.dataRange, ...options.dataRange },
      };

      drawGradientLineChart(box, canvas, labels, datasets, gradientLineOptions);

      if (window.innerWidth > 1024) {
        canvas.onmousemove = (event: MouseEvent) => {
          gradientLineMouseOver(event, box, canvas, labels, datasets, gradientLineOptions);
        };
      }

      const redrawGradientLineChart = () => {
        drawGradientLineChart(box, canvas, labels, datasets, gradientLineOptions);
      };

      window.addEventListener("resize", redrawGradientLineChart);

      return () => {
        window.removeEventListener("resize", redrawGradientLineChart);
      };
    }
  }, [boxRef.current, canvasRef.current, labels, datasets]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
