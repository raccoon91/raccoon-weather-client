import { FC, useRef, useEffect } from "react";
import { toDecimal, getDataRange, getCanvasPostion, drawDot, drawLine } from "utils";
import { chartTheme } from "configs";
import { Box } from "./Box";

const lineDefaultOptions = {
  chart: {
    paddingX: 0,
    paddingY: 5,
    yAxisWidth: 0,
    xAxisHeight: 0,
  },
  draw: { paddingX: 0, paddingY: 0 },
  dataRange: {},
};

const drawLineChart = (box: HTMLDivElement, canvas: HTMLCanvasElement, datasets: number[], options: ICanvasOptions) => {
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

interface ILineChartProps {
  datasets?: number[] | null;
  options?: ICanvasOptions;
}

export const LineChart: FC<ILineChartProps> = ({ datasets, options = lineDefaultOptions }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets?.length) {
      const lineOptions = {
        chart: { ...lineDefaultOptions.chart, ...options.chart },
        draw: { ...lineDefaultOptions.draw, ...options.draw },
        dataRange: { ...lineDefaultOptions.dataRange, ...options.dataRange },
      };

      drawLineChart(box, canvas, datasets, lineOptions);

      const redrawLineChart = () => {
        drawLineChart(box, canvas, datasets, lineOptions);
      };

      window.addEventListener("resize", redrawLineChart);

      return () => {
        window.removeEventListener("resize", redrawLineChart);
      };
    }
  }, [boxRef.current, canvasRef.current, datasets]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
