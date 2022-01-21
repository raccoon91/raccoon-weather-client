import { chartTheme } from "configs";
import { drawTooltip } from ".";
import { toDecimal, getChartOptions, drawYAxis, drawXAxis, drawChartYTicks, drawChartXTicks, drawDot } from "./common";

interface IScatterPlotFrame {
  x: number;
  y: number;
  c: string;
}

const createScatterPlotFrames = (
  datasets: number[][],
  min: number,
  range: number,
  drawStartX: number,
  drawEndY: number,
  nodeWidth: number,
  drawHeight: number,
  dataCount: number,
  duration: number
) => {
  const frames: IScatterPlotFrame[] = [];
  const totalFrames = 60 * duration;
  const frameCount = Math.ceil(dataCount / totalFrames);

  for (let i = 0; i < datasets.length; i++) {
    const x = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    for (let j = 0; j < datasets[i].length; j++) {
      const color = datasets[i][j] >= 33 ? "red" : "blue";
      const originY = drawEndY - toDecimal(((datasets[i][j] - min) * drawHeight) / range);

      frames.push({ x, y: originY, c: color });
    }
  }

  return { frames, frameCount };
};

const requestScatterPlotAnimationFrame = (
  ctx: CanvasRenderingContext2D,
  index: number,
  frames: IScatterPlotFrame[],
  frameCount: number
) => {
  for (let i = 0; i < frameCount; i++) {
    if (frames[index + i]) {
      drawDot(ctx, frames[index + i].x, frames[index + i].y, {
        size: 3,
        color: frames[index + i].c === "red" ? chartTheme.red : chartTheme.blue,
        alpha: 0.5,
      });
    } else {
      break;
    }
  }

  if (index < frames.length - 1) {
    requestAnimationFrame(() => requestScatterPlotAnimationFrame(ctx, index + frameCount, frames, frameCount));
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

  const { frames, frameCount } = createScatterPlotFrames(
    datasets,
    min,
    range,
    drawStartX,
    drawEndY,
    nodeWidth,
    drawHeight,
    dataRange?.dataCount || datasets.length,
    options.animation.duration
  );
  requestScatterPlotAnimationFrame(ctx, 0, frames, frameCount);

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

export const drawScatterPlot = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  tooltip: HTMLDivElement,
  labels: string[],
  datasets: number[][],
  dataRange: IDataRange,
  options: ICanvasOptions,
  hover?: { i?: number; j?: number; x?: number; y?: number }
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

    for (let j = 0; j < datasets[i].length; j++) {
      const positionY = drawEndY - toDecimal(((datasets[i][j] - min) * drawHeight) / range);

      const dotOptions = {
        size: i === hover?.i && j === hover?.j ? 6 : 3,
        color: datasets[i][j] >= 33 ? chartTheme.red : chartTheme.blue,
        alpha: i === hover?.i && j === hover?.j ? 1 : 0.5,
      };

      drawDot(ctx, positionX, positionY, dotOptions);
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

  if (options.tooltip.on && hover?.i !== undefined && hover?.j !== undefined && hover?.x && hover?.y) {
    drawTooltip(tooltip, hover.x, hover.y, labels[hover.i], datasets[hover.i][hover.j], options.tooltip);
  } else {
    tooltip.style.opacity = "0";
  }
};

export const scatterPlotMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  tooltip: HTMLDivElement,
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

  let hover: { i?: number; j?: number; x?: number; y?: number } = {};

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    for (let j = 0; j < datasets[i].length; j++) {
      const positionY = drawEndY - toDecimal(((datasets[i][j] - min) * drawHeight) / range);

      if (mouseX > positionX - 3 && mouseX < positionX + 3 && mouseY > positionY - 3 && mouseY < positionY + 3) {
        hover = { i, j, x: mouseX, y: mouseY };

        break;
      }
    }
  }

  drawScatterPlot(box, canvas, tooltip, labels, datasets, dataRange, options, hover);
};
