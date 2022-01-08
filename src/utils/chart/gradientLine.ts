import { chartTheme } from "configs";
import {
  toDecimal,
  getChartOptions,
  drawYAxis,
  drawXAxis,
  drawChartYTicks,
  drawChartXTicks,
  drawDot,
  drawLine,
} from "./common";

const getPoint = (
  index: number,
  value: number,
  min: number,
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number
) => ({
  x: index * nodeWidth + drawStartX + toDecimal(nodeWidth / 2),
  y: drawEndY - toDecimal(((value - min) * drawHeight) / range),
});

const createGradientLineChartFrames = (
  datasets: number[],
  min: number,
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number
) => {
  const frames = [];

  for (let i = 1; i < datasets.length; i++) {
    if ((datasets[i - 1] <= 0 && datasets[i] <= 0) || (datasets[i - 1] >= 0 && datasets[i] >= 0)) {
      const color = datasets[i - 1] <= 0 && datasets[i] <= 0 ? "blue" : "red";
      const ps = getPoint(i - 1, datasets[i - 1], min, range, drawStartX, drawEndY, nodeWidth, drawHeight);
      const pe = getPoint(i, datasets[i], min, range, drawStartX, drawEndY, nodeWidth, drawHeight);

      frames.push({ x0: ps.x, y0: ps.y, x1: pe.x, y1: pe.y, c: color });
    } else {
      const ps = getPoint(i - 1, datasets[i - 1], min, range, drawStartX, drawEndY, nodeWidth, drawHeight);
      const pe = getPoint(i, datasets[i], min, range, drawStartX, drawEndY, nodeWidth, drawHeight);
      const p0 = {
        x: ((drawEndY - toDecimal(((0 - min) * drawHeight) / range) - ps.y) * (pe.x - ps.x)) / (pe.y - ps.y) + ps.x,
        y: drawEndY - toDecimal(((0 - min) * drawHeight) / range),
      };

      frames.push({ x0: ps.x, y0: ps.y, x1: p0.x, y1: p0.y, c: datasets[i - 1] > 0 ? "red" : "blue" });
      frames.push({ x0: p0.x, y0: p0.y, x1: pe.x, y1: pe.y, c: datasets[i] > 0 ? "red" : "blue" });
    }
  }

  return frames;
};

const requestGradientLineChartAnimationFrame = (
  ctx: CanvasRenderingContext2D,
  index: number,
  frames: { x0: number; y0: number; x1: number; y1: number; c: string }[]
) => {
  const color = frames[index].c === "red" ? chartTheme.red : chartTheme.blue;

  drawLine(ctx, frames[index].x0, frames[index].y0, frames[index].x1, frames[index].y1, { color });

  if (index < frames.length - 1) {
    requestAnimationFrame(() => requestGradientLineChartAnimationFrame(ctx, index + 1, frames));
  }
};

export const animateGradientLineChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[],
  dataRange: IDataRange,
  options: ICanvasOptions,
  hoverId?: number
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const { min, max, range } = dataRange;
  const { startX, startY, endX, endY, drawStartX, drawEndY, drawHeight, nodeWidth } = getChartOptions({
    box,
    dataLength: datasets.length,
    options,
  });

  drawYAxis(ctx, startX, startY, endY);
  drawXAxis(ctx, startX, endX, endY);

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
    const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

    const dotOptions = {
      size: i === hoverId ? 6 : 2,
      color: i === hoverId ? (datasets[i] > 0 ? chartTheme.red : chartTheme.blue) : chartTheme.black,
      alpha: i === hoverId ? 1 : 0.3,
    };

    drawDot(ctx, positionX, positionY, dotOptions);
  }

  const frames = createGradientLineChartFrames(datasets, min, range, drawStartX, drawEndY, nodeWidth, drawHeight);
  requestGradientLineChartAnimationFrame(ctx, 0, frames);

  drawChartYTicks({ ctx, min, max, range, startX, drawEndY, drawHeight, increment: 0.5 });
  drawChartXTicks({ ctx, labels, nodeWidth, endY, drawStartX, maxCount: 16, minCount: 10 });
};

export const drawGradientLineChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[],
  dataRange: IDataRange,
  options: ICanvasOptions,
  hoverId?: number
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const { min, max, range } = dataRange;
  const { startX, startY, endX, endY, drawStartX, drawEndY, drawHeight, nodeWidth } = getChartOptions({
    box,
    dataLength: datasets.length,
    options,
  });

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

  drawChartYTicks({ ctx, min, max, range, startX, drawEndY, drawHeight, increment: 0.5 });
  drawChartXTicks({ ctx, labels, nodeWidth, endY, drawStartX, maxCount: 16, minCount: 10 });
};

export const gradientLineMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[],
  dataRange: IDataRange,
  options: ICanvasOptions
) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const { min, range } = dataRange;
  const { drawStartX, drawEndY, drawHeight, nodeWidth } = getChartOptions({
    box,
    dataLength: datasets.length,
    options,
  });

  let hoverId: number | undefined;

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
    const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

    if (mouseX > positionX - 4 && mouseX < positionX + 4 && mouseY > positionY - 4 && mouseY < positionY + 4) {
      hoverId = i;
      break;
    }
  }

  drawGradientLineChart(box, canvas, labels, datasets, dataRange, options, hoverId);
};
