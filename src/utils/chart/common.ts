import {
  chartTheme,
  axisDefaultOptions,
  tickDefaultOptions,
  dotDefaultOptions,
  barDefaultOptions,
  lineDefaultOptions,
} from "configs";

export const createHiDPICanvas = (box: HTMLDivElement, canvas: HTMLCanvasElement) => {
  const ratio = window.devicePixelRatio || 1;
  const { clientWidth, clientHeight } = box;

  canvas.width = clientWidth * ratio;
  canvas.height = clientHeight * ratio;
  canvas.style.width = clientWidth + "px";
  canvas.style.height = clientHeight + "px";

  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, clientWidth, clientHeight);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    return ctx;
  }
};

export const toDecimal = (value: number, digits = 2) => {
  return Number(value.toFixed(digits));
};

export const mergeCanvasOptions = (defaultOptions: ICanvasOptions, options?: ICanvasOptionsPrpos): ICanvasOptions => {
  return options
    ? {
        chart: { ...defaultOptions.chart, ...options.chart },
        tick: { ...defaultOptions.tick, ...options.tick },
        draw: { ...defaultOptions.draw, ...options.draw },
        data: { ...defaultOptions.data, ...options.data },
        animation: { ...defaultOptions.animation, ...options.animation },
        tooltip: { ...defaultOptions.tooltip, ...options.tooltip },
      }
    : defaultOptions;
};

const getDataRange = (datasets: number[], dataOptions?: IOptionsData) => {
  let min = !dataOptions || dataOptions.min === undefined ? datasets[0] : dataOptions.min;
  let max = !dataOptions || dataOptions.max === undefined ? datasets[0] : dataOptions.max;

  datasets.forEach((value) => {
    if ((!dataOptions || dataOptions.min === undefined) && value < min) min = value;
    if ((!dataOptions || dataOptions.max === undefined) && value > max) max = value;
  });

  return {
    min: !dataOptions || dataOptions.min === undefined ? min : dataOptions.min,
    max: !dataOptions || dataOptions.max === undefined ? max : dataOptions.max,
    range: max - min,
  };
};

const getStackDataRange = (datasets: number[][], dataOptions?: IOptionsData) => {
  let min = !dataOptions || dataOptions.min === undefined ? datasets[0][0] : dataOptions.min;
  let max = !dataOptions || dataOptions.max === undefined ? datasets[0][0] : dataOptions.max;
  let dataCount = 0;

  datasets.forEach((nestedDatas) => {
    nestedDatas.forEach((value) => {
      if ((!dataOptions || dataOptions.min === undefined) && value < min) min = value;
      if ((!dataOptions || dataOptions.max === undefined) && value > max) max = value;
      dataCount += 1;
    });
  });

  return {
    min: !dataOptions || dataOptions.min === undefined ? min : dataOptions.min,
    max: !dataOptions || dataOptions.max === undefined ? max : dataOptions.max,
    range: max - min,
    dataCount,
  };
};

export const getChartDataRange = (datasets: number[] | number[][], dataOptions?: IOptionsData) => {
  if (Array.isArray(datasets[0])) {
    return getStackDataRange(datasets as number[][], dataOptions);
  } else {
    return getDataRange(datasets as number[], dataOptions);
  }
};

export const getChartOptions = ({
  box,
  dataLength,
  options,
}: {
  box: HTMLDivElement;
  dataLength: number;
  options: ICanvasOptions;
}) => {
  const { clientWidth, clientHeight } = box;
  const { chart, draw } = options;

  return {
    startX: chart.displayYAxis ? chart.paddingX + chart.yAxisWidth : chart.paddingX,
    startY: chart.paddingY,
    endX: clientWidth - chart.paddingX,
    endY: chart.displayXAxis ? clientHeight - chart.paddingY - chart.xAxisHeight : clientHeight - chart.paddingY,
    chartWidth: chart.displayYAxis
      ? clientWidth - 2 * chart.paddingX - chart.yAxisWidth
      : clientWidth - 2 * chart.paddingX,
    chartHeight: chart.displayXAxis
      ? clientHeight - 2 * chart.paddingY - chart.xAxisHeight
      : clientHeight - 2 * chart.paddingY,

    drawStartX: chart.displayYAxis ? chart.paddingX + chart.yAxisWidth + draw.paddingX : chart.paddingX + draw.paddingX,
    drawStartY: chart.paddingY + draw.paddingY,
    drawEndX: clientWidth - chart.paddingX - draw.paddingX,
    drawEndY: chart.displayXAxis
      ? clientHeight - chart.paddingY - chart.xAxisHeight - draw.paddingY
      : clientHeight - chart.paddingY - draw.paddingY,
    drawWidth: chart.displayYAxis
      ? clientWidth - 2 * chart.paddingX - chart.yAxisWidth - 2 * draw.paddingX
      : clientWidth - 2 * chart.paddingX - 2 * draw.paddingX,
    drawHeight: chart.displayXAxis
      ? clientHeight - 2 * chart.paddingY - chart.xAxisHeight - 2 * draw.paddingY
      : clientHeight - 2 * chart.paddingY - 2 * draw.paddingY,
    nodeWidth: chart.displayYAxis
      ? toDecimal((clientWidth - 2 * chart.paddingX - chart.yAxisWidth - 2 * draw.paddingX) / dataLength)
      : toDecimal((clientWidth - 2 * chart.paddingX - 2 * draw.paddingX) / dataLength),
  };
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
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX, endY);
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
  ctx.moveTo(startX, endY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
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
  ctx.textAlign = "right";
  ctx.fillText(value, startX - 8, positionY + 4);

  ctx.globalAlpha = strokeAlpha;
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(startX - 5, positionY);
  ctx.lineTo(startX, positionY);
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
  ctx.textAlign = "center";
  ctx.fillText(value, positionX, endY + 15);

  ctx.globalAlpha = strokeAlpha;
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(positionX, endY);
  ctx.lineTo(positionX, endY + 5);
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
  options,
}: {
  ctx: CanvasRenderingContext2D;
  min: number;
  max: number;
  range: number;
  startX: number;
  drawEndY: number;
  drawHeight: number;
  options: IOptinosTick;
}) => {
  const yTickIncrement = options.yTickIncrement || 500;

  for (let value = min; value <= max; value += yTickIncrement) {
    const positionY = drawEndY - toDecimal(((value - min) * drawHeight) / range);

    drawYTick(ctx, startX, positionY, options?.yTickFormatter ? options.yTickFormatter(value) : String(value));
  }
};

export const drawChartXTicks = ({
  ctx,
  labels,
  nodeWidth,
  endY,
  drawStartX,
  options,
}: {
  ctx: CanvasRenderingContext2D;
  labels: string[];
  nodeWidth: number;
  endY: number;
  drawStartX: number;
  options: IOptinosTick;
}) => {
  let xTickSkip = 1;

  if (window.innerWidth > 1024) {
    xTickSkip = Math.ceil(labels.length / (options?.xTickMax || 10));
  } else {
    xTickSkip = Math.ceil(labels.length / (options?.xTickMin || 8));
  }

  for (let i = 0; i < labels.length; i += xTickSkip) {
    const positionMidX = i * nodeWidth + drawStartX + toDecimal(nodeWidth / 2);

    drawXTick(
      ctx,
      positionMidX,
      endY,
      options?.xTickFormatter ? options.xTickFormatter(labels[i]) : labels[i].slice(2)
    );
  }
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
  ctx.lineWidth = strokeWidth || 1;
  ctx.strokeRect(positionX, positionY, width, height);
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
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
};

export const drawTooltip = (
  tooltip: HTMLDivElement,
  x: number,
  y: number,
  label: string,
  value: number,
  options: IOptionsTooltip
) => {
  if (options.on) {
    tooltip.style.opacity = "1";
    tooltip.style.top = `${y}px`;
    tooltip.style.left = `${x}px`;
    tooltip.innerHTML = `
      <div class="tooltip-wrapper">
        <p class="tooltip-label">${options?.xLabel || "x값"} :</p>
        <p class="tooltip-value">${options?.xFormatter ? options.xFormatter(label) : label}</p>
      </div>
      <div class="tooltip-wrapper">
        <p class="tooltip-label">${options?.yLabel || "y값"} :</p>
        <p class="tooltip-value">${options?.yFormatter ? options.yFormatter(value) : value}</p>
      </div>
    `;
  }
};
