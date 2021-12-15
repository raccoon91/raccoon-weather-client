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

export const drawYAxis = (ctx: CanvasRenderingContext2D, originX: number, originY: number, endY: number) => {
  ctx.beginPath();
  ctx.moveTo(originX + 0.5, originY);
  ctx.lineTo(originX + 0.5, endY);
  ctx.stroke();
};

export const drawXAxis = (ctx: CanvasRenderingContext2D, originX: number, endX: number, endY: number) => {
  ctx.beginPath();
  ctx.moveTo(originX, endY + 0.5);
  ctx.lineTo(endX, endY + 0.5);
  ctx.stroke();
};

export const drawYTick = (ctx: CanvasRenderingContext2D, originX: number, positionY: number, value: string) => {
  ctx.fillText(value, originX - 25, positionY + 4);

  ctx.beginPath();
  ctx.moveTo(originX - 5, positionY + 0.5);
  ctx.lineTo(originX, positionY + 0.5);
  ctx.stroke();
};

export const drawXTick = (ctx: CanvasRenderingContext2D, positionX: number, endY: number, value: string) => {
  ctx.fillText(value, positionX - 4, endY + 15);

  ctx.beginPath();
  ctx.moveTo(positionX + 0.5, endY);
  ctx.lineTo(positionX + 0.5, endY + 5);
  ctx.stroke();
};

export const drawDot = (ctx: CanvasRenderingContext2D, positionX: number, positionY: number) => {
  ctx.beginPath();
  ctx.arc(positionX, positionY, 3, 0, Math.PI * 2);
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = "blue";
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.fillStyle = "black";
};

export const drawBar = (
  ctx: CanvasRenderingContext2D,
  positionX: number,
  positionY: number,
  width: number,
  height: number
) => {
  ctx.fillStyle = "blue";
  ctx.globalAlpha = 0.3;
  ctx.fillRect(positionX, positionY, width, height);

  ctx.globalAlpha = 1;
  ctx.strokeStyle = "blue";
  ctx.strokeRect(positionX, positionY, width, height);

  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
};
