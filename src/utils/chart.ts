export const parseDatasets = (datasets: IChartData[], rangeOptions?: IRangeOptions): IDataRange => {
  let minX = rangeOptions?.minX !== undefined ? rangeOptions.minX : datasets[0].x;
  let maxX = rangeOptions?.maxX !== undefined ? rangeOptions.maxX : datasets[0].x;
  let minY = rangeOptions?.minY !== undefined ? rangeOptions.minY : datasets[0].value;
  let maxY = rangeOptions?.maxY !== undefined ? rangeOptions.maxY : datasets[0].value;

  datasets.forEach((data) => {
    if (data.x < minX) minX = data.x;
    if (data.x > maxX) maxX = data.x;
    if (data.value < minY) minY = data.value;
    if (data.value > maxY) maxY = data.value;
  });

  const rangeX = maxX - minX;
  const rangeY = maxY - minY;

  return { minX, maxX, minY, maxY, rangeX, rangeY };
};

export const getCanvasPostion = (
  clientWidth: number,
  clientHeight: number,
  canvasOptions: ICanvasOptions
): ICanvasPostion => {
  const { canvasPadding, yAxisWidth, xAxisHeight } = canvasOptions;

  const originX = canvasPadding + yAxisWidth;
  const originY = canvasPadding;
  const endX = clientWidth - canvasPadding;
  const endY = clientHeight - canvasPadding - xAxisHeight;
  const chartWidth = clientWidth - 2 * canvasPadding - yAxisWidth;
  const chartHeight = clientHeight - 2 * canvasPadding - xAxisHeight;

  return { originX, originY, endX, endY, chartWidth, chartHeight };
};

export const getCalibration = (value: number, width: number, range: number) => {
  return Math.floor((value * width) / range);
};

export const getCalibrationXY = (
  data: IChartData,
  dataRange: IDataRange,
  canvasPosition: ICanvasPostion,
  canvasOptions: ICanvasOptions
) => {
  const { minX, minY, rangeX, rangeY } = dataRange;
  const { chartWidth, chartHeight } = canvasPosition;
  const { chartPadding } = canvasOptions;

  const calibrationX = getCalibration(data.x - minX, chartWidth - 2 * chartPadding, rangeX);
  const calibrationY = getCalibration(data.value - minY, chartHeight - 2 * chartPadding, rangeY);

  return { calibrationX, calibrationY };
};

const axisDefaultOptions = {
  alpha: 1,
  style: "black",
};

export const drawYAxis = (
  ctx: CanvasRenderingContext2D,
  originX: number,
  originY: number,
  endY: number,
  axisOptions?: IAxisOptions
) => {
  const { alpha, style } = { ...axisDefaultOptions, ...axisOptions };

  ctx.globalAlpha = alpha;
  ctx.strokeStyle = style;

  ctx.beginPath();
  ctx.moveTo(originX + 0.5, originY);
  ctx.lineTo(originX + 0.5, endY);
  ctx.stroke();
};

export const drawXAxis = (
  ctx: CanvasRenderingContext2D,
  originX: number,
  endX: number,
  endY: number,
  axisOptions?: IAxisOptions
) => {
  const { alpha, style } = { ...axisDefaultOptions, ...axisOptions };

  ctx.globalAlpha = alpha;
  ctx.strokeStyle = style;

  ctx.beginPath();
  ctx.moveTo(originX, endY + 0.5);
  ctx.lineTo(endX, endY + 0.5);
  ctx.stroke();
};

const tickDefaultOptions = {
  textAlpha: 1,
  textStyle: "black",
  strokeAlpha: 1,
  strokeStyle: "black",
};

export const drawYTick = (
  ctx: CanvasRenderingContext2D,
  originX: number,
  positionY: number,
  value: string,
  tickOptions?: ITickOptions
) => {
  const { textAlpha, textStyle, strokeAlpha, strokeStyle } = { ...tickDefaultOptions, ...tickOptions };

  ctx.globalAlpha = textAlpha;
  ctx.fillStyle = textStyle;
  ctx.fillText(value, originX - 25, positionY + 4);

  ctx.globalAlpha = strokeAlpha;
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(originX - 5, positionY + 0.5);
  ctx.lineTo(originX, positionY + 0.5);
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

const dotDefaultOptions = {
  size: 3,
  color: "blue",
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
  ctx.fillStyle = color || "blue";

  ctx.beginPath();
  ctx.arc(positionX, positionY, size || 3, 0, Math.PI * 2);
  ctx.fill();
};

const barDefaultOptions = {
  barColor: "blue",
  barAlpha: 0.3,
  strokeColor: "blue",
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
  ctx.fillStyle = barColor || "blue";
  ctx.fillRect(positionX, positionY, width, height);

  ctx.globalAlpha = strokeAlpha || barAlpha || 1;
  ctx.strokeStyle = strokeColor || barColor || "blue";
  ctx.lineWidth = strokeWidth || 0.5;
  ctx.strokeRect(positionX, positionY, width, height);
};

const lineDefaultOptions = {
  color: "blue",
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
  ctx.strokeStyle = color || "blue";

  ctx.beginPath();
  ctx.moveTo(startX, startY + 0.5);
  ctx.lineTo(endX, endY + 0.5);
  ctx.stroke();
};
