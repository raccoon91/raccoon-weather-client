import {
  createHiDPICanvas,
  toDecimal,
  getChartOptions,
  drawYAxis,
  drawXAxis,
  drawChartYTicks,
  drawChartXTicks,
  drawBar,
  drawTooltip,
} from "./common";

interface IBarChartFrame {
  x: number;
  y: number;
  w: number;
  h: number;
}

const barChartFrames = (
  datasets: number[],
  totalFrames: number,
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number
) => {
  const frames: IBarChartFrame[] = [];
  const frameCount = Math.ceil(datasets.length / totalFrames);

  for (let i = 0; i < datasets.length; i++) {
    const x = i * nodeWidth + drawStartX;
    const y = drawEndY;
    const w = nodeWidth;
    const h = -toDecimal((datasets[i] * drawHeight) / range);

    frames.push({ x, y, w, h });
  }

  return { frames, frameCount };
};

const extendedBarChartFrames = (
  datasets: number[],
  totalFrames: number,
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number
) => {
  const frames: IBarChartFrame[] = [];
  const frameCount = 1;
  const devideFrame = Math.floor(totalFrames / datasets.length);

  for (let i = 0; i < datasets.length; i++) {
    const x = i * nodeWidth + drawStartX;
    const y = drawEndY;
    const w = nodeWidth;
    const originH = -toDecimal((datasets[i] * drawHeight) / range);

    for (let j = 0; j < devideFrame - 1; j++) {
      const h = toDecimal((originH * j) / devideFrame);

      frames.push({ x, y, w, h });
    }

    frames.push({ x, y, w, h: originH });
  }

  return { frames, frameCount };
};

const createBarChartFrames = (
  datasets: number[],
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number,
  duration: number
) => {
  const totalFrames = 60 * duration;

  if (datasets.length >= totalFrames) {
    return barChartFrames(datasets, totalFrames, range, drawStartX, drawEndY, nodeWidth, drawHeight);
  } else {
    return extendedBarChartFrames(datasets, totalFrames, range, drawStartX, drawEndY, nodeWidth, drawHeight);
  }
};

const requestBarChartAnimationFrame = (
  ctx: CanvasRenderingContext2D,
  index: number,
  nodeWidth: number,
  frames: IBarChartFrame[],
  frameCount: number,
  barOptions: IBarOptions
) => {
  for (let i = 0; i < frameCount; i++) {
    if (frames[index + i]) {
      ctx.clearRect(frames[index + i].x, frames[index + i].y, frames[index + i].w, frames[index + i].h);
      drawBar(ctx, frames[index + i].x, frames[index + i].y, frames[index + i].w, frames[index + i].h, barOptions);
    } else {
      break;
    }
  }

  if (index < frames.length - 1) {
    requestAnimationFrame(() =>
      requestBarChartAnimationFrame(ctx, index + frameCount, nodeWidth, frames, frameCount, barOptions)
    );
  }
};

export const animateBarChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
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

  const barOptions = {
    barColor: options.draw.barColor,
    barAlpha: 0.5,
    strokeColor: options.draw.barColor,
    strokeAlpha: 1,
    strokeWidth: 0.5,
  };

  const { frames, frameCount } = createBarChartFrames(
    datasets,
    range,
    drawStartX,
    drawEndY,
    nodeWidth,
    drawHeight,
    options.animation.duration
  );
  requestBarChartAnimationFrame(ctx, 0, nodeWidth, frames, frameCount, barOptions);

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

  if (options.chart.displayXAxis) {
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

export const drawBarChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  tooltip: HTMLDivElement,
  labels: string[],
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

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX;
    const positionY = drawEndY;
    const height = -toDecimal((datasets[i] * drawHeight) / range);

    const barOptions = {
      barColor: options.draw.barColor,
      barAlpha: i === hover?.id ? 1 : 0.5,
      strokeColor: options.draw.barColor,
      strokeAlpha: 1,
      strokeWidth: 0.5,
    };

    drawBar(ctx, positionX, positionY, nodeWidth, height, barOptions);
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

  if (options.chart.displayXAxis) {
    drawChartXTicks({
      ctx,
      labels,
      nodeWidth,
      endY,
      drawStartX,
      options: options.tick,
    });
  }

  if (options.tooltip.on && hover?.id !== undefined && hover?.x && hover?.y) {
    drawTooltip(tooltip, hover.x, hover.y, labels[hover.id], datasets[hover.id], options.tooltip);
  }
};

export const barChartMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  tooltip: HTMLDivElement,
  labels: string[],
  datasets: number[],
  dataRange: IDataRange,
  options: ICanvasOptions
) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const { range } = dataRange;
  const { startX, endY, drawHeight, nodeWidth } = getChartOptions({ box, dataLength: datasets.length, options });

  const hover: { id?: number; x?: number; y?: number } = {};

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + startX;
    const positionY = endY - toDecimal((datasets[i] * drawHeight) / range);
    const height = endY - positionY;

    if (mouseX > positionX && mouseX < positionX + nodeWidth && mouseY >= positionY && mouseY <= positionY + height) {
      hover.id = i;
      hover.x = mouseX;
      hover.y = mouseY;

      break;
    }
  }

  drawBarChart(box, canvas, tooltip, labels, datasets, dataRange, options, hover);
};
