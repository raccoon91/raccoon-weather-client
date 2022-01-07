import { chartTheme } from "configs";
import {
  toDecimal,
  getDataRange,
  getCanvasPostion,
  drawYAxis,
  drawXAxis,
  drawYTick,
  drawXTick,
  drawDot,
  drawLine,
} from "./common";

export const drawGradientLineChart = (
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

  const { min, range } = getDataRange(datasets, options.dataRange);
  const { startX, startY, endX, endY, drawStartX, drawEndY, drawWidth, drawHeight } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

  drawYAxis(ctx, startX, startY, endY);
  drawXAxis(ctx, startX, endX, endY);

  const redLineOptions = { color: chartTheme.red };
  const blueLineOptions = { color: chartTheme.blue };

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
    const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

    const dotOptions = {
      size: i === hoverId ? 6 : 2,
      color: i === hoverId ? (datasets[i] > 0 ? chartTheme.red : chartTheme.blue) : chartTheme.black,
      alpha: i === hoverId ? 1 : 0.3,
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

  for (let value = min; value <= 1; value += 0.5) {
    const positionY = drawEndY - toDecimal(((value - min) * drawHeight) / range);

    drawYTick(ctx, startX, positionY, String(value));
  }

  let xTickSkip = 1;

  if (window.innerWidth > 1024) {
    xTickSkip = Math.ceil(labels.length / 16);
  } else {
    xTickSkip = Math.ceil(labels.length / 10);
  }

  for (let i = 0; i < labels.length; i += xTickSkip) {
    const middleX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    drawXTick(ctx, middleX, endY, labels[i].slice(2));
  }
};

export const gradientLineMouseOver = (
  event: MouseEvent,
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: number[],
  options: ICanvasOptions
) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const { min, range } = getDataRange(datasets, options.dataRange);
  const { drawStartX, drawEndY, drawWidth, drawHeight } = getCanvasPostion(box, options);
  const nodeWidth = toDecimal(drawWidth / datasets.length);

  let hoverId: number | undefined;

  for (let i = 0; i < datasets.length; i++) {
    const positionX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);
    const positionY = drawEndY - toDecimal(((datasets[i] - min) * drawHeight) / range);

    if (mouseX > positionX - 4 && mouseX < positionX + 4 && mouseY > positionY - 4 && mouseY < positionY + 4) {
      hoverId = i;
      break;
    }
  }

  drawGradientLineChart(box, canvas, labels, datasets, options, hoverId);
};
