import { chartTheme } from "configs";
import { toDecimal, getDataRange, getCanvasPostion, drawDot, drawLine } from "./common";

const getLinePoints = (
  datasets: number[],
  min: number,
  range: number,
  startX: number,
  endY: number,
  width: number,
  height: number
) => {
  const waypoints = [];

  for (let i = 1; i < datasets.length; i++) {
    const pt0 = {
      x: (i - 1) * width + startX + toDecimal(width / 2),
      y: endY - toDecimal(((datasets[i - 1] - min) * height) / range),
    };
    const pt1 = {
      x: i * width + startX + toDecimal(width / 2),
      y: endY - toDecimal(((datasets[i] - min) * height) / range),
    };
    const dx = pt1.x - pt0.x;
    const dy = pt1.y - pt0.y;

    for (let j = 0; j < 5; j++) {
      const x = pt0.x + toDecimal((dx * j) / 5);
      const y = pt0.y + toDecimal((dy * j) / 5);

      waypoints.push({ x, y });
    }

    if (i === datasets.length - 1) {
      waypoints.push({ x: pt1.x, y: pt1.y });
    }
  }

  return waypoints;
};

const requestLineChartAnimate = (
  ctx: CanvasRenderingContext2D,
  index: number,
  points: { x: number; y: number }[],
  lineOptions?: ILineOptions
) => {
  drawLine(ctx, points[index - 1].x, points[index - 1].y, points[index].x, points[index].y, lineOptions);

  if (index < points.length - 1) {
    requestAnimationFrame(() => requestLineChartAnimate(ctx, index + 1, points, lineOptions));
  }
};

export const animateLineChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  datasets: number[],
  options: ICanvasOptions
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const { min, range } = getDataRange(datasets, options.dataRange);
  const { drawStartX, drawEndY, drawWidth, drawHeight } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

  const dotOptions = { size: 3, color: chartTheme.green, alpha: 1 };

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
    const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

    drawDot(ctx, positionX, positionY, dotOptions);
  }

  const points = getLinePoints(datasets, min, range, drawStartX, drawEndY, nodeWidth, drawHeight);
  requestLineChartAnimate(ctx, 1, points, { color: chartTheme.green });
};

export const drawLineChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  datasets: number[],
  options: ICanvasOptions
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const { min, range } = getDataRange(datasets, options.dataRange);
  const { drawStartX, drawEndY, drawWidth, drawHeight } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

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
