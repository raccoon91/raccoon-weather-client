import { chartTheme } from "configs";

export const toDecimal = (value: number, digits = 2) => {
  return Number(value.toFixed(digits));
};

const getDataRange = (datasets: number[], data: { min?: number; max?: number }) => {
  let min = data.min === undefined ? datasets[0] : data.min;
  let max = data.max === undefined ? datasets[0] : data.max;

  datasets.forEach((value) => {
    if (data.min === undefined && value < min) min = value;
    if (data.max === undefined && value > max) max = value;
  });

  return {
    min: data.min === undefined ? min : data.min,
    max: data.max === undefined ? max : data.max,
    range: max - min,
  };
};

const getStackDataRange = (datasets: number[][], data: { min?: number; max?: number }) => {
  let min = data.min === undefined ? datasets[0][0] : data.min;
  let max = data.max === undefined ? datasets[0][0] : data.max;

  datasets.forEach((nestedDatas) => {
    nestedDatas.forEach((value) => {
      if (data.min === undefined && value < min) min = value;
      if (data.max === undefined && value > max) max = value;
    });
  });

  return {
    min: data.min === undefined ? min : data.min,
    max: data.max === undefined ? max : data.max,
    range: max - min,
  };
};

export const getChartDataRange = (datasets: number[] | number[][], data: { min?: number; max?: number }) => {
  if (data.min !== undefined && data.max !== undefined) {
    return { min: data.min, max: data.max, range: data.max - data.min };
  } else if (Array.isArray(datasets[0])) {
    return getStackDataRange(datasets as number[][], data);
  } else {
    return getDataRange(datasets as number[], data);
  }
};

export const getCanvasPostion = (box: HTMLDivElement, canvasOptions: ICanvasOptions) => {
  const { clientWidth, clientHeight } = box;
  const { chart } = canvasOptions;

  return {
    startX: chart.paddingX + chart.yAxisWidth,
    startY: chart.paddingY,
    endX: clientWidth - chart.paddingX,
    endY: clientHeight - chart.paddingY - chart.xAxisHeight,
    chartWidth: clientWidth - 2 * chart.paddingX - chart.yAxisWidth,
    chartHeight: clientHeight - 2 * chart.paddingY - chart.xAxisHeight,
  };
};

export const getDrawPostion = (box: HTMLDivElement, canvasOptions: ICanvasOptions, dataLength: number) => {
  const { clientWidth, clientHeight } = box;
  const { chart, draw } = canvasOptions;

  return {
    drawStartX: chart.paddingX + chart.yAxisWidth + draw.paddingX,
    drawStartY: chart.paddingY + draw.paddingY,
    drawEndX: clientWidth - chart.paddingX - draw.paddingX,
    drawEndY: clientHeight - chart.paddingY - chart.xAxisHeight - draw.paddingY,
    drawWidth: clientWidth - 2 * chart.paddingX - chart.yAxisWidth - 2 * draw.paddingX,
    drawHeight: clientHeight - 2 * chart.paddingY - chart.xAxisHeight - 2 * draw.paddingY,
    nodeWidth: toDecimal((clientWidth - 2 * chart.paddingX - chart.yAxisWidth - 2 * draw.paddingX) / dataLength),
  };
};

export const getChartOptions = ({
  box,
  dataLength,
  options,
}: {
  box: HTMLDivElement;
  dataLength: number;
  options: ICanvasOptions;
}) => ({
  ...getCanvasPostion(box, options),
  ...getDrawPostion(box, options, dataLength),
});

const axisDefaultOptions = {
  alpha: 1,
  style: chartTheme.black,
};

export const drawYAxis = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endY: number,
  axisOptions?: IAxisOptions
) => {
  const { alpha, style } = { ...axisDefaultOptions, ...axisOptions };

  ctx.globalAlpha = alpha;
  ctx.strokeStyle = style;

  ctx.beginPath();
  ctx.moveTo(startX + 0.5, startY);
  ctx.lineTo(startX + 0.5, endY);
  ctx.stroke();
};

export const drawXAxis = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  endX: number,
  endY: number,
  axisOptions?: IAxisOptions
) => {
  const { alpha, style } = { ...axisDefaultOptions, ...axisOptions };

  ctx.globalAlpha = alpha;
  ctx.strokeStyle = style;

  ctx.beginPath();
  ctx.moveTo(startX, endY + 0.5);
  ctx.lineTo(endX, endY + 0.5);
  ctx.stroke();
};

const tickDefaultOptions = {
  textAlpha: 1,
  textStyle: chartTheme.black,
  strokeAlpha: 1,
  strokeStyle: chartTheme.black,
};

export const drawYTick = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  positionY: number,
  value: string,
  tickOptions?: ITickOptions
) => {
  const { textAlpha, textStyle, strokeAlpha, strokeStyle } = { ...tickDefaultOptions, ...tickOptions };

  ctx.globalAlpha = textAlpha;
  ctx.fillStyle = textStyle;
  ctx.fillText(value, startX - 27, positionY + 4);

  ctx.globalAlpha = strokeAlpha;
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(startX - 5, positionY + 0.5);
  ctx.lineTo(startX, positionY + 0.5);
  ctx.stroke();
};

export const drawXTick = (
  ctx: CanvasRenderingContext2D,
  positionX: number,
  endY: number,
  value: string,
  tickOptions?: ITickOptions
) => {
  const { textAlpha, textStyle, strokeAlpha, strokeStyle } = { ...tickDefaultOptions, ...tickOptions };

  ctx.globalAlpha = textAlpha;
  ctx.fillStyle = textStyle;
  ctx.fillText(value, positionX - 4, endY + 15);

  ctx.globalAlpha = strokeAlpha;
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(positionX + 0.5, endY);
  ctx.lineTo(positionX + 0.5, endY + 5);
  ctx.stroke();
};

export const drawChartYTicks = ({
  ctx,
  min,
  max,
  range,
  startX,
  drawEndY,
  drawHeight,
  increment,
  formatter,
}: {
  ctx: CanvasRenderingContext2D;
  min: number;
  max: number;
  range: number;
  startX: number;
  drawEndY: number;
  drawHeight: number;
  increment: number;
  formatter?: (value: number) => string;
}) => {
  for (let value = min; value <= max; value += increment) {
    const positionY = drawEndY - toDecimal(((value - min) * drawHeight) / range);

    drawYTick(ctx, startX, positionY, formatter ? formatter(value) : String(value));
  }
};

export const drawChartXTicks = ({
  ctx,
  labels,
  nodeWidth,
  endY,
  drawStartX,
  maxCount,
  minCount,
}: {
  ctx: CanvasRenderingContext2D;
  labels: string[];
  nodeWidth: number;
  endY: number;
  drawStartX: number;
  maxCount: number;
  minCount: number;
}) => {
  let xTickSkip = 1;

  if (window.innerWidth > 1024) {
    xTickSkip = Math.ceil(labels.length / maxCount);
  } else {
    xTickSkip = Math.ceil(labels.length / minCount);
  }

  for (let i = 0; i < labels.length; i += xTickSkip) {
    const positionMidX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    drawXTick(ctx, positionMidX, endY, labels[i].slice(2));
  }
};

const dotDefaultOptions = {
  size: 3,
  color: chartTheme.blue,
  alpha: 0.5,
};

export const drawDot = (
  ctx: CanvasRenderingContext2D,
  positionX: number,
  positionY: number,
  dotOptions?: IDotOptions
) => {
  const { size, color, alpha } = { ...dotDefaultOptions, ...dotOptions };

  ctx.globalAlpha = alpha || 0.5;
  ctx.fillStyle = color || chartTheme.blue;

  ctx.beginPath();
  ctx.arc(positionX, positionY, size || 3, 0, Math.PI * 2);
  ctx.fill();
};

const barDefaultOptions = {
  barColor: chartTheme.blue,
  barAlpha: 0.3,
  strokeColor: chartTheme.blue,
  strokeAlpha: 0.5,
  strokeWidth: 0.5,
};

export const drawBar = (
  ctx: CanvasRenderingContext2D,
  positionX: number,
  positionY: number,
  width: number,
  height: number,
  barOptions: IBarOptions
) => {
  const { barColor, barAlpha, strokeColor, strokeAlpha, strokeWidth } = { ...barDefaultOptions, ...barOptions };

  ctx.globalAlpha = barAlpha || 0.3;
  ctx.fillStyle = barColor || chartTheme.blue;
  ctx.fillRect(positionX, positionY, width, height);

  ctx.globalAlpha = strokeAlpha || barAlpha || 1;
  ctx.strokeStyle = strokeColor || barColor || chartTheme.blue;
  ctx.lineWidth = strokeWidth || 0.5;
  ctx.strokeRect(positionX, positionY, width, height);
};

const lineDefaultOptions = {
  color: chartTheme.blue,
};

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  lineOptions?: ILineOptions
) => {
  const { color } = { ...lineDefaultOptions, ...lineOptions };

  ctx.globalAlpha = 1;
  ctx.strokeStyle = color || chartTheme.blue;

  ctx.beginPath();
  ctx.moveTo(startX, startY + 0.5);
  ctx.lineTo(endX, endY + 0.5);
  ctx.stroke();
};
