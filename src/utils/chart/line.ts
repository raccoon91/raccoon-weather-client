import { drawTooltip } from ".";
import {
  createHiDPICanvas,
  toDecimal,
  getChartOptions,
  drawDot,
  drawLine,
  drawYAxis,
  drawXAxis,
  drawChartYTicks,
  drawChartXTicks,
} from "./common";

interface ILineChartFrame {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

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

const lineChartFrames = (
  datasets: number[],
  totalFrames: number,
  min: number,
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number
) => {
  const frames: ILineChartFrame[] = [];
  const frameCount = Math.floor(datasets.length / totalFrames);

  for (let i = 1; i < datasets.length; i++) {
    const index = i;
    const ps = getPoint(index - 1, datasets[index - 1], min, range, drawStartX, drawEndY, nodeWidth, drawHeight);
    const pe = getPoint(index, datasets[index], min, range, drawStartX, drawEndY, nodeWidth, drawHeight);

    frames.push({ x0: ps.x, y0: ps.y, x1: pe.x, y1: pe.y });
  }

  return { frames, frameCount };
};

const extendedLineChartFrames = (
  datasets: number[],
  totalFrames: number,
  min: number,
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number
) => {
  const frames: ILineChartFrame[] = [];
  const frameCount = 1;
  const devideFrame = Math.floor(totalFrames / datasets.length);

  for (let i = 1; i < datasets.length; i++) {
    const ps = getPoint(i - 1, datasets[i - 1], min, range, drawStartX, drawEndY, nodeWidth, drawHeight);
    const pe = getPoint(i, datasets[i], min, range, drawStartX, drawEndY, nodeWidth, drawHeight);

    let x0 = ps.x;
    let y0 = ps.y;
    const dx = toDecimal((pe.x - ps.x) / devideFrame);
    const dy = toDecimal((pe.y - ps.y) / devideFrame);

    for (let j = 0; j < devideFrame - 1; j++) {
      frames.push({ x0, y0, x1: (x0 += dx), y1: (y0 += dy) });
    }

    frames.push({ x0, y0, x1: pe.x, y1: pe.y });
  }

  return { frames, frameCount };
};

const createLineChartFrames = (
  datasets: number[],
  min: number,
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number,
  duration: number
) => {
  const totalFrames = 60 * duration;

  if (datasets.length >= totalFrames) {
    return lineChartFrames(datasets, totalFrames, min, range, drawStartX, drawEndY, nodeWidth, drawHeight);
  } else {
    return extendedLineChartFrames(datasets, totalFrames, min, range, drawStartX, drawEndY, nodeWidth, drawHeight);
  }
};

const requestLineChartAnimationFrame = (
  ctx: CanvasRenderingContext2D,
  index: number,
  frames: ILineChartFrame[],
  frameCount: number,
  lineOptions?: ILineOptions
) => {
  for (let i = 0; i < frameCount; i++) {
    if (frames[index + i]) {
      drawLine(
        ctx,
        frames[index + i].x0,
        frames[index + i].y0,
        frames[index + i].x1,
        frames[index + i].y1,
        lineOptions
      );
    } else {
      break;
    }
  }

  if (index < frames.length - 1) {
    requestAnimationFrame(() =>
      requestLineChartAnimationFrame(ctx, index + frameCount, frames, frameCount, lineOptions)
    );
  }
};

export const animateLineChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[] | null,
  datasets: number[],
  dataRange: IDataRange,
  options: ICanvasOptions
) => {
  const ctx = createHiDPICanvas(box, canvas);

  if (!ctx) return;

  const { min, max, range } = dataRange;
  const { startX, startY, endX, endY, drawStartX, drawEndY, drawHeight, nodeWidth } = getChartOptions({
    box,
    dataLength: datasets.length,
    options,
  });

  if (options.chart.displayYAxis) {
    drawYAxis(ctx, startX, startY, endY);
  }

  if (options.chart.displayXAxis) {
    drawXAxis(ctx, startX, endX, endY);
  }

  if (options?.draw?.dot) {
    const dotOptions = { size: 3, color: options.draw.dotColor, alpha: 1 };

    for (let i = 0; i < datasets.length; i++) {
      const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
      const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

      drawDot(ctx, positionX, positionY, dotOptions);
    }
  }

  const { frames, frameCount } = createLineChartFrames(
    datasets,
    min,
    range,
    drawStartX,
    drawEndY,
    nodeWidth,
    drawHeight,
    options.animation.duration
  );
  requestLineChartAnimationFrame(ctx, 0, frames, frameCount, { color: options.draw.lineColor });

  if (options.chart.displayYAxis) {
    drawChartYTicks({
      ctx,
      min,
      max,
      range,
      startX,
      drawEndY,
      drawHeight,
      options: options.tick,
    });
  }

  if (options.chart.displayXAxis && labels) {
    drawChartXTicks({
      ctx,
      labels,
      nodeWidth,
      endY,
      drawStartX,
      options: options.tick,
    });
  }
};

export const drawLineChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  tooltip: HTMLDivElement,
  labels: string[] | null,
  datasets: number[],
  dataRange: IDataRange,
  options: ICanvasOptions,
  hover?: { id?: number; x?: number; y?: number }
) => {
  const ctx = createHiDPICanvas(box, canvas);

  if (!ctx) return;

  const { min, max, range } = dataRange;
  const { startX, startY, endX, endY, drawStartX, drawEndY, drawHeight, nodeWidth } = getChartOptions({
    box,
    dataLength: datasets.length,
    options,
  });

  if (options.chart.displayYAxis) {
    drawYAxis(ctx, startX, startY, endY);
  }

  if (options.chart.displayXAxis) {
    drawXAxis(ctx, startX, endX, endY);
  }

  const dotOptions = { size: 3, color: options.draw.dotColor, alpha: 1 };

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
    const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

    if (options?.draw?.dot) {
      drawDot(ctx, positionX, positionY, dotOptions);
    }

    if (hover?.id === i) {
      drawDot(ctx, positionX, positionY, dotOptions);
    }

    if (i > 0 && i < datasets.length) {
      const positionStartX = (i - 1) * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
      const positionStartY = drawEndY - toDecimal(((datasets[i - 1] - min) * drawHeight) / range);

      drawLine(ctx, positionStartX, positionStartY, positionX, positionY, { color: options.draw.lineColor });
    }
  }

  if (options.chart.displayYAxis) {
    drawChartYTicks({
      ctx,
      min,
      max,
      range,
      startX,
      drawEndY,
      drawHeight,
      options: options.tick,
    });
  }

  if (options.chart.displayXAxis && labels) {
    drawChartXTicks({
      ctx,
      labels,
      nodeWidth,
      endY,
      drawStartX,
      options: options.tick,
    });
  }

  if (options.tooltip.on && labels && hover?.id !== undefined && hover?.x && hover?.y) {
    drawTooltip(tooltip, hover.x, hover.y, labels[hover.id], datasets[hover.id], options.tooltip);
  }
};

export const lineChartMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  tooltip: HTMLDivElement,
  labels: string[] | null,
  datasets: number[],
  dataRange: IDataRange,
  options: ICanvasOptions
) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const { drawStartX, drawStartY, drawEndY, nodeWidth } = getChartOptions({
    box,
    dataLength: datasets.length,
    options,
  });

  const hover: { id?: number; x?: number; y?: number } = {};

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    if (mouseX > positionX - 4 && mouseX < positionX + 4 && mouseY >= drawStartY && mouseY <= drawEndY) {
      hover.id = i;
      hover.x = mouseX;
      hover.y = mouseY;

      break;
    }
  }

  drawLineChart(box, canvas, tooltip, labels, datasets, dataRange, options, hover);
};
