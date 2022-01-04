import { FC, useRef, useEffect } from "react";
import { toDecimal, getDataRange, getCanvasPostion, drawYAxis, drawXAxis, drawYTick, drawXTick, drawBar } from "utils";
import { theme } from "configs";
import { Box } from "./Box";

const barChartDefaultOptions = {
  chart: {
    paddingX: 5,
    paddingY: 8,
    yAxisWidth: 25,
    xAxisHeight: 10,
  },
  draw: { paddingX: 0, paddingY: 0 },
  dataRange: { min: 0 },
};

const drawBarChart = (
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

  const { min, max, range } = getDataRange(datasets, options.dataRange);
  const { startX, startY, endX, endY, drawStartX, drawEndY, drawWidth, drawHeight } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

  drawYAxis(ctx, startX, startY, endY);
  drawXAxis(ctx, startX, endX, endY);

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX;
    const positionY = drawEndY - toDecimal((datasets[i] * drawHeight) / range);
    const height = drawEndY - positionY;

    const barOptions = {
      barColor: theme.color.blue,
      barAlpha: i === hoverId ? 1 : 0.5,
      strokeColor: theme.color.blue,
      strokeAlpha: 1,
      strokeWidth: 0.5,
    };

    drawBar(ctx, positionX, positionY, nodeWidth, height, barOptions);
  }

  for (let value = min; value <= max; value += 500) {
    const positionY = drawEndY - toDecimal((value * drawHeight) / range);

    drawYTick(ctx, startX, positionY, value.toFixed(0));
  }

  let xTickSkip = 1;

  if (window.innerWidth > 1024) {
    xTickSkip = Math.ceil(labels.length / 10);
  } else {
    xTickSkip = Math.ceil(labels.length / 8);
  }

  for (let i = 0; i < labels.length; i += xTickSkip) {
    const middleX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    drawXTick(ctx, middleX, endY, labels[i].slice(2));
  }
};

const barChartMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[],
  options: ICanvasOptions
) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const { range } = getDataRange(datasets, { min: 0 });
  const { startX, endY, drawHeight, drawWidth } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

  let hoverId: number | undefined;

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + startX;
    const positionY = endY - toDecimal((datasets[i] * drawHeight) / range);
    const height = endY - positionY;

    if (mouseX > positionX && mouseX < positionX + nodeWidth && mouseY > positionY && mouseY < positionY + height) {
      hoverId = i;

      break;
    }
  }

  drawBarChart(box, canvas, labels, datasets, options, hoverId);
};

interface IBarChartProps {
  labels: string[];
  datasets: number[];
  options?: ICanvasOptions;
}

export const BarChart: FC<IBarChartProps> = ({ labels, datasets, options = barChartDefaultOptions }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && labels.length && datasets.length) {
      const barOptions = {
        chart: { ...barChartDefaultOptions.chart, ...options.chart },
        draw: { ...barChartDefaultOptions.draw, ...options.draw },
        dataRange: { ...barChartDefaultOptions.dataRange, ...options.dataRange },
      };

      drawBarChart(box, canvas, labels, datasets, barOptions);

      if (window.innerWidth > 1024) {
        canvas.onmousemove = (event: MouseEvent) => {
          barChartMouseOver(event, box, canvas, labels, datasets, barOptions);
        };
      }

      const redrawBarChart = () => {
        drawBarChart(box, canvas, labels, datasets, barOptions);
      };

      window.addEventListener("resize", redrawBarChart);

      return () => {
        window.removeEventListener("resize", redrawBarChart);
      };
    }
  }, [boxRef.current, canvasRef.current, labels, datasets]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
