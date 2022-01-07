import { chartTheme } from "configs";
import {
  toDecimal,
  getStackDataRange,
  getCanvasPostion,
  drawYAxis,
  drawXAxis,
  drawYTick,
  drawXTick,
  drawDot,
} from "./common";

let percent = 0;

export const animateScatterPlot = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[][],
  options: ICanvasOptions
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  if (percent < 100) {
    percent += 2;
    requestAnimationFrame(() => animateScatterPlot(box, canvas, labels, datasets, options));
  }

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
      const positionY = drawEndY - toDecimal(((((datasets[i][j] - min) * percent) / 100) * drawHeight) / range);

      const dotOptions = {
        size: 3,
        color: datasets[i][j] >= 33 ? chartTheme.red : chartTheme.blue,
        alpha: 0.5,
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

export const drawScatterPlot = (
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

export const scatterPlotMouseOver = (
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
