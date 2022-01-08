import { chartTheme } from "configs";
import { toDecimal, getChartOptions, drawDot, drawLine } from "./common";

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

const createLineChartFrames = (
  datasets: number[],
  min: number,
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number
) => {
  const frames = [];
  const count = 7;

  for (let i = 1; i < datasets.length; i++) {
    const ps = getPoint(i - 1, datasets[i - 1], min, range, drawStartX, drawEndY, nodeWidth, drawHeight);
    const pe = getPoint(i, datasets[i], min, range, drawStartX, drawEndY, nodeWidth, drawHeight);

    let x0 = ps.x;
    let y0 = ps.y;
    const dx = toDecimal((pe.x - ps.x) / count);
    const dy = toDecimal((pe.y - ps.y) / count);

    for (let j = 0; j < count - 1; j++) {
      frames.push({ x0, y0, x1: (x0 += dx), y1: (y0 += dy) });
    }

    frames.push({ x0, y0, x1: pe.x, y1: pe.y });
  }

  return frames;
};

const requestLineChartAnimationFrame = (
  ctx: CanvasRenderingContext2D,
  index: number,
  frames: { x0: number; y0: number; x1: number; y1: number }[],
  lineOptions?: ILineOptions
) => {
  drawLine(ctx, frames[index].x0, frames[index].y0, frames[index].x1, frames[index].y1, lineOptions);

  if (index < frames.length - 1) {
    requestAnimationFrame(() => requestLineChartAnimationFrame(ctx, index + 1, frames, lineOptions));
  }
};

export const animateLineChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  datasets: number[],
  dataRange: IDataRange,
  options: ICanvasOptions
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const { min, range } = dataRange;
  const { drawStartX, drawEndY, drawHeight, nodeWidth } = getChartOptions({
    box,
    dataLength: datasets.length,
    options,
  });

  const dotOptions = { size: 3, color: chartTheme.green, alpha: 1 };

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
    const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

    drawDot(ctx, positionX, positionY, dotOptions);
  }

  const frames = createLineChartFrames(datasets, min, range, drawStartX, drawEndY, nodeWidth, drawHeight);
  requestLineChartAnimationFrame(ctx, 0, frames, { color: chartTheme.green });
};

export const drawLineChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  datasets: number[],
  dataRange: IDataRange,
  options: ICanvasOptions
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const { min, range } = dataRange;
  const { drawStartX, drawEndY, drawHeight, nodeWidth } = getChartOptions({
    box,
    dataLength: datasets.length,
    options,
  });

  const dotOptions = { size: 3, color: chartTheme.green, alpha: 1 };

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
    const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

    drawDot(ctx, positionX, positionY, dotOptions);

    if (i > 0 && i < datasets.length) {
      const positionStartX = (i - 1) * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
      const positionStartY = drawEndY - toDecimal(((datasets[i - 1] - min) * drawHeight) / range);

      drawLine(ctx, positionStartX, positionStartY, positionX, positionY, { color: chartTheme.green });
    }
  }
};
