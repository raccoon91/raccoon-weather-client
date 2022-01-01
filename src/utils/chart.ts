export const toDecimal = (value: number, digits = 2) => {
  return Number(value.toFixed(digits));
};

export const getDataRange = (datasets: number[], dataRange: { min?: number; max?: number }) => {
  if (dataRange.min !== undefined && dataRange.max !== undefined) {
    return { min: dataRange.min, max: dataRange.max, range: dataRange.max - dataRange.min };
  } else {
    let min = dataRange.min === undefined ? datasets[0] : dataRange.min;
    let max = dataRange.max === undefined ? datasets[0] : dataRange.max;

    datasets.forEach((data) => {
      if (dataRange.min === undefined && data < min) {
        min = data;
      }

      if (dataRange.max === undefined && data > max) {
        max = data;
      }
    });

    return {
      min: dataRange.min === undefined ? min : dataRange.min,
      max: dataRange.max === undefined ? max : dataRange.max,
      range: max - min,
    };
  }
};

export const getStackDataRange = (datasets: number[][], dataRange: { min?: number; max?: number }) => {
  if (dataRange.min !== undefined && dataRange.max !== undefined) {
    return { min: dataRange.min, max: dataRange.max, range: dataRange.max - dataRange.min };
  } else {
    let min = datasets[0][0];
    let max = datasets[0][0];

    datasets.forEach((nestedDatas) => {
      nestedDatas.forEach((data) => {
        if (dataRange.min === undefined && data < min) {
          min = data;
        }

        if (dataRange.max === undefined && data > max) {
          max = data;
        }
      });
    });

    return {
      min: dataRange.min === undefined ? min : dataRange.min,
      max: dataRange.max === undefined ? max : dataRange.max,
      range: max - min,
    };
  }
};

export const getCanvasPostion = (box: HTMLDivElement, canvasOptions: ICanvasOptions) => {
  const { clientWidth, clientHeight } = box;
  const { chart, draw } = canvasOptions;

  return {
    startX: chart.paddingX + chart.yAxisWidth,
    startY: chart.paddingY,
    endX: clientWidth - chart.paddingX,
    endY: clientHeight - chart.paddingY - chart.xAxisHeight,
    chartWidth: clientWidth - 2 * chart.paddingX - chart.yAxisWidth,
    chartHeight: clientHeight - 2 * chart.paddingY - chart.xAxisHeight,

    drawStartX: chart.paddingX + chart.yAxisWidth + draw.paddingX,
    drawStartY: chart.paddingY + draw.paddingY,
    drawEndX: clientWidth - chart.paddingX - draw.paddingX,
    drawEndY: clientHeight - chart.paddingY - chart.xAxisHeight - draw.paddingY,
    drawWidth: clientWidth - 2 * chart.paddingX - chart.yAxisWidth - 2 * draw.paddingX,
    drawHeight: clientHeight - 2 * chart.paddingY - chart.xAxisHeight - 2 * draw.paddingY,
  };
};

const axisDefaultOptions = {
  alpha: 1,
  style: "black",
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
  textStyle: "black",
  strokeAlpha: 1,
  strokeStyle: "black",
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
