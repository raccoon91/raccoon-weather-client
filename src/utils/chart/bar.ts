import { chartTheme } from "configs";
import { toDecimal, getChartOptions, drawYAxis, drawXAxis, drawChartYTicks, drawChartXTicks, drawBar } from "./common";

const createBarChartFrames = (
  datasets: number[],
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number
) => {
  const frames = [];

  for (let i = 0; i < datasets.length; i++) {
    const x = i * nodeWidth + drawStartX;
    const y = drawEndY;
    const w = nodeWidth;
    const originH = -toDecimal((datasets[i] * drawHeight) / range);

    for (let j = 0; j < 3; j++) {
      const h = toDecimal((originH * j) / 3);

      frames.push({ x, y, w, h });
    }

    frames.push({ x, y, w, h: originH });
  }

  return frames;
};

const requestBarChartAnimationFrame = (
  ctx: CanvasRenderingContext2D,
  index: number,
  nodeWidth: number,
  frames: { x: number; y: number; w: number; h: number }[],
  barOptions: IBarOptions
) => {
  ctx.clearRect(frames[index].x, frames[index].y, frames[index].w, frames[index].h);
  drawBar(ctx, frames[index].x, frames[index].y, frames[index].w, frames[index].h, barOptions);

  if (index < frames.length - 1) {
    requestAnimationFrame(() => requestBarChartAnimationFrame(ctx, index + 1, nodeWidth, frames, barOptions));
  }
};

const yTickFormatter = (value: number) => value.toFixed(0);

export const animateBarChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[],
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

  const barOptions = {
    barColor: chartTheme.blue,
    barAlpha: 0.5,
    strokeColor: chartTheme.blue,
    strokeAlpha: 1,
    strokeWidth: 0.5,
  };

  const frames = createBarChartFrames(datasets, range, drawStartX, drawEndY, nodeWidth, drawHeight);
  requestBarChartAnimationFrame(ctx, 0, nodeWidth, frames, barOptions);

  drawChartYTicks({ ctx, min, max, range, startX, drawEndY, drawHeight, increment: 500, formatter: yTickFormatter });
  drawChartXTicks({ ctx, labels, nodeWidth, endY, drawStartX, maxCount: 10, minCount: 8 });
};

export const drawBarChart = (
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
    const positionX = i * nodeWidth + drawStartX;
    const positionY = drawEndY;
    const height = -toDecimal((datasets[i] * drawHeight) / range);

    const barOptions = {
      barColor: chartTheme.blue,
      barAlpha: i === hoverId ? 1 : 0.5,
      strokeColor: chartTheme.blue,
      strokeAlpha: 1,
      strokeWidth: 0.5,
    };

    drawBar(ctx, positionX, positionY, nodeWidth, height, barOptions);
  }

  drawChartYTicks({ ctx, min, max, range, startX, drawEndY, drawHeight, increment: 500, formatter: yTickFormatter });
  drawChartXTicks({ ctx, labels, nodeWidth, endY, drawStartX, maxCount: 10, minCount: 8 });
};

export const barChartMouseOver = (
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

  const { range } = dataRange;
  const { startX, endY, drawHeight, nodeWidth } = getChartOptions({ box, dataLength: datasets.length, options });

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

  drawBarChart(box, canvas, labels, datasets, dataRange, options, hoverId);
};
