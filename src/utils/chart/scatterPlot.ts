import { chartTheme } from "configs";
import { toDecimal, getChartOptions, drawYAxis, drawXAxis, drawChartYTicks, drawChartXTicks, drawDot } from "./common";

const createScatterPlotFrames = (
  datasets: number[][],
  min: number,
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number
) => {
  const frames = [];

  for (let i = 0; i < datasets.length; i++) {
    const x = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    for (let j = 0; j < datasets[i].length; j++) {
      const color = datasets[i][j] >= 33 ? "red" : "blue";
      const originY = drawEndY - toDecimal(((datasets[i][j] - min) * drawHeight) / range);

      frames.push({ x, y: originY, c: color });
    }
  }

  return frames;
};

const requestScatterPlotAnimationFrame = (
  ctx: CanvasRenderingContext2D,
  index: number,
  frames: { x: number; y: number; c: string }[]
) => {
  if (frames[index]) {
    drawDot(ctx, frames[index].x, frames[index].y, {
      size: 3,
      color: frames[index].c === "red" ? chartTheme.red : chartTheme.blue,
      alpha: 0.5,
    });
  }

  if (frames[index + 1]) {
    drawDot(ctx, frames[index + 1].x, frames[index + 1].y, {
      size: 3,
      color: frames[index + 1].c === "red" ? chartTheme.red : chartTheme.blue,
      alpha: 0.5,
    });
  }

  if (index < frames.length - 1) {
    requestAnimationFrame(() => requestScatterPlotAnimationFrame(ctx, index + 2, frames));
  }
};

export const animateScatterPlot = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[][],
  dataRange: IDataRange,
  options: ICanvasOptions
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

  const frames = createScatterPlotFrames(datasets, min, range, drawStartX, drawEndY, nodeWidth, drawHeight);
  requestScatterPlotAnimationFrame(ctx, 0, frames);

  drawChartYTicks({ ctx, min, max, range, startX, drawEndY, drawHeight, increment: 5 });
  drawChartXTicks({ ctx, labels, nodeWidth, endY, drawStartX, maxCount: 10, minCount: 8 });
};

export const drawScatterPlot = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[][],
  dataRange: IDataRange,
  options: ICanvasOptions,
  hoverPosition?: { x: number; y: number }
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

  drawChartYTicks({ ctx, min, max, range, startX, drawEndY, drawHeight, increment: 5 });
  drawChartXTicks({ ctx, labels, nodeWidth, endY, drawStartX, maxCount: 10, minCount: 8 });
};

export const scatterPlotMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[][],
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

  drawScatterPlot(box, canvas, labels, datasets, dataRange, options, hoverPosition);
};
