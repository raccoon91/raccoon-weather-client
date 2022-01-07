import { theme } from "configs";
import {
  toDecimal,
  getDataRange,
  getCanvasPostion,
  drawYAxis,
  drawXAxis,
  drawYTick,
  drawXTick,
  drawBar,
} from "./common";

let percent = 0;

export const animateBarChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[],
  options: ICanvasOptions
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  if (percent < 100) {
    percent += 2;
    requestAnimationFrame(() => animateBarChart(box, canvas, labels, datasets, options));
  }

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const { min, max, range } = getDataRange(datasets, options.dataRange);
  const { startX, startY, endX, endY, drawStartX, drawEndY, drawWidth, drawHeight } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

  drawYAxis(ctx, startX, startY, endY);
  drawXAxis(ctx, startX, endX, endY);

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX;
    const positionY = drawEndY - toDecimal((toDecimal((datasets[i] * percent) / 100) * drawHeight) / range);
    const height = drawEndY - positionY;

    const barOptions = {
      barColor: theme.color.blue,
      barAlpha: 0.5,
      strokeColor: theme.color.blue,
      strokeAlpha: 1,
      strokeWidth: 0.5,
    };

    drawBar(ctx, positionX, positionY, nodeWidth, height, barOptions);
  }

  for (let value = min; value <= max; value += 500) {
    const positionY = drawEndY - toDecimal((value * drawHeight) / range);

    drawYTick(ctx, startX, positionY, value.toFixed(0));
  }

  let xTickSkip = 1;

  if (window.innerWidth > 1024) {
    xTickSkip = Math.ceil(labels.length / 10);
  } else {
    xTickSkip = Math.ceil(labels.length / 8);
  }

  for (let i = 0; i < labels.length; i += xTickSkip) {
    const middleX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    drawXTick(ctx, middleX, endY, labels[i].slice(2));
  }
};

export const drawBarChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[],
  options: ICanvasOptions,
  hoverId?: number
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const { min, max, range } = getDataRange(datasets, options.dataRange);
  const { startX, startY, endX, endY, drawStartX, drawEndY, drawWidth, drawHeight } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

  drawYAxis(ctx, startX, startY, endY);
  drawXAxis(ctx, startX, endX, endY);

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX;
    const positionY = drawEndY - toDecimal((datasets[i] * drawHeight) / range);
    const height = drawEndY - positionY;

    const barOptions = {
      barColor: theme.color.blue,
      barAlpha: i === hoverId ? 1 : 0.5,
      strokeColor: theme.color.blue,
      strokeAlpha: 1,
      strokeWidth: 0.5,
    };

    drawBar(ctx, positionX, positionY, nodeWidth, height, barOptions);
  }

  for (let value = min; value <= max; value += 500) {
    const positionY = drawEndY - toDecimal((value * drawHeight) / range);

    drawYTick(ctx, startX, positionY, value.toFixed(0));
  }

  let xTickSkip = 1;

  if (window.innerWidth > 1024) {
    xTickSkip = Math.ceil(labels.length / 10);
  } else {
    xTickSkip = Math.ceil(labels.length / 8);
  }

  for (let i = 0; i < labels.length; i += xTickSkip) {
    const middleX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    drawXTick(ctx, middleX, endY, labels[i].slice(2));
  }
};

export const barChartMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[],
  options: ICanvasOptions
) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const { range } = getDataRange(datasets, { min: 0 });
  const { startX, endY, drawHeight, drawWidth } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

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

  drawBarChart(box, canvas, labels, datasets, options, hoverId);
};
