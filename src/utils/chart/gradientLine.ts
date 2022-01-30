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
  drawTooltip,
} from "./common";

interface IGradientLineChartFrame {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  c: string;
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

const createGradientLineChartFrames = (
  datasets: number[],
  min: number,
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number,
  duration: number
) => {
  const frames: IGradientLineChartFrame[] = [];
  const totalFrames = 60 * duration;
  const frameCount = Math.ceil(datasets.length / totalFrames);

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

  return { frames, frameCount };
};

const requestGradientLineChartAnimationFrame = (
  ctx: CanvasRenderingContext2D,
  index: number,
  frames: IGradientLineChartFrame[],
  frameCount: number
) => {
  for (let i = 0; i < frameCount; i++) {
    if (frames[index + i]) {
      const color = frames[index + i].c === "red" ? chartTheme.red : chartTheme.blue;

      drawLine(ctx, frames[index + i].x0, frames[index + i].y0, frames[index + i].x1, frames[index + i].y1, { color });
    } else {
      break;
    }
  }

  if (index < frames.length - 1) {
    requestAnimationFrame(() => requestGradientLineChartAnimationFrame(ctx, index + frameCount, frames, frameCount));
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

  ctx.clearRect(0, 0, clientWidth, clientHeight);
  canvas.width = clientWidth;
  canvas.height = clientHeight;

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
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
    const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

    const dotOptions = {
      size: i === hoverId ? 4 : 1,
      color: i === hoverId ? (datasets[i] > 0 ? chartTheme.red : chartTheme.blue) : chartTheme.black,
      alpha: i === hoverId ? 1 : 0.3,
    };

    drawDot(ctx, positionX, positionY, dotOptions);
  }

  const { frames, frameCount } = createGradientLineChartFrames(
    datasets,
    min,
    range,
    drawStartX,
    drawEndY,
    nodeWidth,
    drawHeight,
    options.animation.duration
  );
  requestGradientLineChartAnimationFrame(ctx, 0, frames, frameCount);

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

export const drawGradientLineChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  tooltip: HTMLDivElement,
  labels: string[],
  datasets: number[],
  dataRange: IDataRange,
  options: ICanvasOptions,
  hover?: { id?: number; x?: number; y?: number }
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  ctx.clearRect(0, 0, clientWidth, clientHeight);
  canvas.width = clientWidth;
  canvas.height = clientHeight;

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

  const redLineOptions = { color: chartTheme.red };
  const blueLineOptions = { color: chartTheme.blue };

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
    const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

    const dotOptions = {
      size: i === hover?.id ? 4 : 1,
      color: i === hover?.id ? (datasets[i] > 0 ? chartTheme.red : chartTheme.blue) : chartTheme.black,
      alpha: i === hover?.id ? 1 : 0.3,
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

export const gradientLineMouseOver = (
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

  drawGradientLineChart(box, canvas, tooltip, labels, datasets, dataRange, options, hover);
};
