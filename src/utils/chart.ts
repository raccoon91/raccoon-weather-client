export const parseDatasets = (datasets: IChartData[]) => {
  const xAxis: number[] = [];
  const yAxis: number[] = [];
  let minX = datasets[0].x;
  let maxX = datasets[0].x;
  let minY = datasets[0].value;
  let maxY = datasets[0].value;

  datasets.forEach((data) => {
    xAxis.push(data.x);
    yAxis.push(data.value);

    if (data.x < minX) minX = data.x;
    if (data.x > maxX) maxX = data.x;
    if (data.value < minY) minY = data.value;
    if (data.value > maxY) maxY = data.value;
  });

  return { xAxis, yAxis, minX, maxX, minY, maxY };
};

export const drawYAxis = (
  ctx: CanvasRenderingContext2D,
  originY: number,
  endY: number,
  positionX: number,
  chartHeight: number,
  chartPadding: number,
  minY: number,
  maxY: number
) => {
  ctx.beginPath();
  ctx.moveTo(positionX + 0.5, originY);
  ctx.lineTo(positionX + 0.5, endY);
  ctx.stroke();

  const rangeY = maxY - minY;

  for (let value = 0; value <= rangeY; value += 10) {
    const y = Math.floor((value * (chartHeight - 2 * chartPadding)) / rangeY);
    const positionY = endY - chartPadding - y;

    ctx.fillText(String(value + minY), positionX - 25, positionY + 4);

    ctx.beginPath();
    ctx.moveTo(positionX - 5, positionY + 0.5);
    ctx.lineTo(positionX, positionY + 0.5);
    ctx.stroke();
  }
};

export const drawXAxis = (
  ctx: CanvasRenderingContext2D,
  originX: number,
  endX: number,
  positionY: number,
  chartWidth: number,
  chartPadding: number,
  minX: number,
  maxX: number
) => {
  ctx.beginPath();
  ctx.moveTo(originX, positionY + 0.5);
  ctx.lineTo(endX, positionY + 0.5);
  ctx.stroke();

  const rangeX = maxX - minX;
  let value = minX;

  for (let index = 0; index <= rangeX; index += 2) {
    const x = Math.floor((index * (chartWidth - 2 * chartPadding)) / rangeX);
    const positionX = x + originX + chartPadding;

    ctx.fillText(String(value).slice(2), positionX - 4, positionY + 15);

    ctx.beginPath();
    ctx.moveTo(positionX + 0.5, positionY);
    ctx.lineTo(positionX + 0.5, positionY + 5);
    ctx.stroke();

    value += 2;
  }
};

export const drawBarYAxis = (
  ctx: CanvasRenderingContext2D,
  positionX: number,
  originY: number,
  endY: number,
  chartHeight: number,
  chartPadding: number,
  maxY: number
) => {
  ctx.beginPath();
  ctx.moveTo(positionX + 0.5, originY);
  ctx.lineTo(positionX + 0.5, endY);
  ctx.stroke();

  let rangeY = maxY;

  if (maxY % 10 !== 0) {
    rangeY += 10;
  }

  for (let value = 0; value <= rangeY; value += 10) {
    const y = Math.floor((value * (chartHeight - 2 * chartPadding)) / rangeY);
    const positionY = endY - chartPadding - y;

    ctx.fillText(String(value), positionX - 25, positionY + 4);

    ctx.beginPath();
    ctx.moveTo(positionX - 5, positionY + 0.5);
    ctx.lineTo(positionX, positionY + 0.5);
    ctx.stroke();
  }
};

export const drawBarXAxis = (
  ctx: CanvasRenderingContext2D,
  originX: number,
  endX: number,
  positionY: number,
  chartPadding: number,
  barWidth: number,
  minX: number,
  maxX: number
) => {
  ctx.beginPath();
  ctx.moveTo(originX, positionY + 0.5);
  ctx.lineTo(endX, positionY + 0.5);
  ctx.stroke();

  const rangeX = maxX - minX;
  let value = minX;

  for (let index = 0; index <= rangeX; index += 2) {
    const positionX = index * barWidth + originX + chartPadding + Math.floor(barWidth / 2);

    ctx.fillText(String(value).slice(2), positionX - 4, positionY + 15);

    ctx.beginPath();
    ctx.moveTo(positionX + 0.5, positionY);
    ctx.lineTo(positionX + 0.5, positionY + 5);
    ctx.stroke();

    value += 2;
  }
};
