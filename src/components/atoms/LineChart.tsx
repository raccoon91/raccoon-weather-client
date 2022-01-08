import { FC, useRef, useEffect } from "react";
import { getChartDataRange, animateLineChart, drawLineChart } from "utils";
import { Box } from "./Box";

const lineDefaultOptions = {
  chart: {
    paddingX: 0,
    paddingY: 5,
    yAxisWidth: 0,
    xAxisHeight: 0,
  },
  draw: { paddingX: 0, paddingY: 0 },
  data: {},
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
        data: { ...lineDefaultOptions.data, ...options.data },
      };
      const dataRange = getChartDataRange(datasets, lineOptions.data);

      animateLineChart(box, canvas, datasets, dataRange, lineOptions);

      const redrawLineChart = () => {
        drawLineChart(box, canvas, datasets, dataRange, lineOptions);
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
