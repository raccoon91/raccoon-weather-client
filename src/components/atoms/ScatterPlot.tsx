import { FC, useRef, useEffect } from "react";
import {
  toDecimal,
  getStackDataRange,
  getCanvasPostion,
  drawYAxis,
  drawXAxis,
  drawYTick,
  drawXTick,
  drawDot,
} from "utils";
import { chartTheme } from "configs";
import { Box } from "./Box";

const scatterPlotDefaultOptions = {
  chart: {
    paddingX: 5,
    paddingY: 8,
    yAxisWidth: 25,
    xAxisHeight: 10,
  },
  draw: {
    paddingX: 5,
    paddingY: 5,
  },
  dataRange: {
    min: 30,
    max: 38,
    range: 55,
  },
};

const drawScatterPlot = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[][],
  options: ICanvasOptions,
  hoverPosition?: { x: number; y: number }
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const { min, max, range } = getStackDataRange(datasets, options.dataRange);
  const { startX, startY, endX, endY, drawStartX, drawEndY, drawWidth, drawHeight } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

  drawYAxis(ctx, startX, startY, endY);
  drawXAxis(ctx, startX, endX, endY);

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    for (let j = 0; j < datasets[i].length; j++) {
      const positionY = drawEndY - toDecimal(((datasets[i][j] - min) * drawHeight) / range);

      const dotOptions = {
        size: hoverPosition && i === hoverPosition.x && j === hoverPosition.y ? 6 : 3,
        color: datasets[i][j] >= 33 ? chartTheme.red : chartTheme.blue,
        alpha: hoverPosition && i === hoverPosition.x && j === hoverPosition.y ? 1 : 0.5,
      };

      drawDot(ctx, positionX, positionY, dotOptions);
    }
  }

  for (let value = min; value <= max; value += 5) {
    const positionY = drawEndY - toDecimal(((value - min) * drawHeight) / range);

    drawYTick(ctx, startX, positionY, String(value));
  }

  let xTickSkip = 1;

  if (window.innerWidth > 1024) {
    xTickSkip = Math.ceil(labels.length / 10);
  } else {
    xTickSkip = Math.ceil(labels.length / 8);
  }

  for (let i = 0; i < labels.length; i += xTickSkip) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    drawXTick(ctx, positionX, endY, labels[i].slice(2));
  }
};

const scatterPlotMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[][],
  options: ICanvasOptions
) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const { min, range } = getStackDataRange(datasets, options.dataRange);
  const { drawStartX, drawEndY, drawWidth, drawHeight } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

  let hoverPosition: { x: number; y: number } | undefined;

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    for (let j = 0; j < datasets[i].length; j++) {
      const positionY = drawEndY - toDecimal(((datasets[i][j] - min) * drawHeight) / range);

      if (mouseX > positionX - 3 && mouseX < positionX + 3 && mouseY > positionY - 3 && mouseY < positionY + 3) {
        hoverPosition = { x: i, y: j };

        break;
      }
    }
  }

  drawScatterPlot(box, canvas, labels, datasets, options, hoverPosition);
};

interface IScatterPlotProps {
  labels?: string[] | null;
  datasets?: number[][] | null;
  options?: ICanvasOptions;
}

export const ScatterPlot: FC<IScatterPlotProps> = ({ labels, datasets, options = scatterPlotDefaultOptions }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && labels?.length && datasets?.length) {
      const scatterPlotOptions = {
        chart: { ...scatterPlotDefaultOptions.chart, ...options.chart },
        draw: { ...scatterPlotDefaultOptions.draw, ...options.draw },
        dataRange: { ...scatterPlotDefaultOptions.dataRange, ...options.dataRange },
      };

      drawScatterPlot(box, canvas, labels, datasets, scatterPlotOptions);

      if (window.innerWidth > 1024) {
        canvas.onmousemove = (event: MouseEvent) => {
          scatterPlotMouseOver(event, box, canvas, labels, datasets, scatterPlotOptions);
        };
      }

      const redrawScatterPlot = () => {
        drawScatterPlot(box, canvas, labels, datasets, scatterPlotOptions);
      };

      window.addEventListener("resize", redrawScatterPlot);

      return () => {
        window.removeEventListener("resize", redrawScatterPlot);
      };
    }
  }, [boxRef.current, canvasRef.current, labels, datasets]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
