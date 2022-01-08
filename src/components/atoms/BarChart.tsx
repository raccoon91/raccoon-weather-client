import { FC, useRef, useEffect } from "react";
import { getChartDataRange, animateBarChart, drawBarChart, barChartMouseOver } from "utils";
import { Box } from "./Box";

const barChartDefaultOptions = {
  chart: {
    paddingX: 5,
    paddingY: 8,
    yAxisWidth: 25,
    xAxisHeight: 10,
  },
  draw: { paddingX: 0, paddingY: 0 },
  data: { min: 0 },
};

interface IBarChartProps {
  labels?: string[] | null;
  datasets?: number[] | null;
  options?: ICanvasOptions;
}

export const BarChart: FC<IBarChartProps> = ({ labels, datasets, options = barChartDefaultOptions }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && labels?.length && datasets?.length) {
      const barOptions = {
        chart: { ...barChartDefaultOptions.chart, ...options.chart },
        draw: { ...barChartDefaultOptions.draw, ...options.draw },
        data: { ...barChartDefaultOptions.data, ...options.data },
      };
      const dataRange = getChartDataRange(datasets, barOptions.data);

      animateBarChart(box, canvas, labels, datasets, dataRange, barOptions);

      if (window.innerWidth > 1024) {
        canvas.onmousemove = (event: MouseEvent) => {
          barChartMouseOver(event, box, canvas, labels, datasets, dataRange, barOptions);
        };
      }

      const redrawBarChart = () => {
        drawBarChart(box, canvas, labels, datasets, dataRange, barOptions);
      };

      window.addEventListener("resize", redrawBarChart);

      return () => {
        window.removeEventListener("resize", redrawBarChart);
      };
    }
  }, [boxRef.current, canvasRef.current, labels, datasets]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
