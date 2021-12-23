import { FC, useRef, useEffect } from "react";
import { parseDatasets, getCanvasPostion, getPositionXY, drawDot, drawLine } from "utils";
import { Box } from "./Box";

const lineDefaultOptions = {
  canvasPadding: 50,
  yAxisWidth: 0,
  xAxisHeight: 0,
  chartPadding: 0,
};

const drawLineChart = (
  box: HTMLDivElement,
  canvas: HTMLCanvasElement,
  datasets: IChartData[],
  canvasOptions: ICanvasOptions,
  hoverId?: number
) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!clientWidth || !clientHeight || !ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const dataRange = parseDatasets(datasets, { minY: -0.5, maxY: 1 });
  const canvasPosition = getCanvasPostion(clientWidth, clientHeight, canvasOptions);

  for (let i = 0; i < datasets.length; i++) {
    const { positionX, positionY } = getPositionXY(datasets[i], dataRange, canvasPosition, canvasOptions);

    const dotOptions = {
      size: i === hoverId ? 6 : 3,
      color: "black",
      alpha: i === hoverId ? 0.7 : 0.3,
    };

    drawDot(ctx, positionX, positionY, dotOptions);

    if (i > 0 && i < datasets.length) {
      const { positionX: positionStartX, positionY: positionStartY } = getPositionXY(
        datasets[i - 1],
        dataRange,
        canvasPosition,
        canvasOptions
      );

      drawLine(ctx, positionStartX, positionStartY, positionX, positionY, { color: "black" });
    }
  }
};

interface ILineChartProps {
  datasets: IChartData[];
  canvasOptions?: ICanvasOptions;
}

export const LineChart: FC<ILineChartProps> = ({ datasets, canvasOptions = lineDefaultOptions }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && datasets.length) {
      drawLineChart(box, canvas, datasets, canvasOptions);

      const redrawLineChart = () => {
        drawLineChart(box, canvas, datasets, canvasOptions);
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
