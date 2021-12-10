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

export const drawYAxis = (ctx: CanvasRenderingContext2D, height: number, minY: number, maxY: number) => {
  ctx.beginPath();
  ctx.moveTo(35.5, 10);
  ctx.lineTo(35.5, height + 10);
  ctx.stroke();

  const range = maxY - minY;

  for (let value = 0; value <= range; value += 10) {
    const y = Math.floor((value * height) / range);

    ctx.fillText(String(value + minY), 5, y + 12);

    ctx.beginPath();
    ctx.moveTo(30, y + 10.5);
    ctx.lineTo(35, y + 10.5);
    ctx.stroke();
  }
};

export const drawXAxis = (ctx: CanvasRenderingContext2D, width: number, height: number, minX: number, maxX: number) => {
  ctx.beginPath();
  ctx.moveTo(30, height + 10.5);
  ctx.lineTo(width + 30, height + 10.5);
  ctx.stroke();

  const range = maxX - minX;
  let value = minX;

  for (let index = 0; index <= range; index += 2) {
    const x = Math.floor((index * width) / range);

    ctx.fillText(String(value), x + 40, height + 30);
    ctx.textAlign = "center";

    ctx.beginPath();
    ctx.moveTo(x + 40.5, height + 10);
    ctx.lineTo(x + 40.5, height + 15);
    ctx.stroke();

    value += 2;
  }
};
