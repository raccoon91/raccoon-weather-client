import { FC, useRef, useEffect } from "react";
import { drawGradientLineChart, gradientLineMouseOver } from "utils";
import { Box } from "./Box";

const gradientLineDefaultOptions = {
  chart: {
    paddingX: 5,
    paddingY: 8,
    yAxisWidth: 25,
    xAxisHeight: 10,
  },
  draw: {
    paddingX: 0,
    paddingY: 10,
  },
  dataRange: {
    min: -0.5,
    max: 1,
  },
};

interface IGradientLineChartProps {
  labels?: string[] | null;
  datasets?: number[] | null;
  options?: ICanvasOptions;
}

export const GradientLineChart: FC<IGradientLineChartProps> = ({
  labels,
  datasets,
  options = gradientLineDefaultOptions,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && labels?.length && datasets?.length) {
      const gradientLineOptions = {
        chart: { ...gradientLineDefaultOptions.chart, ...options.chart },
        draw: { ...gradientLineDefaultOptions.draw, ...options.draw },
        dataRange: { ...gradientLineDefaultOptions.dataRange, ...options.dataRange },
      };

      drawGradientLineChart(box, canvas, labels, datasets, gradientLineOptions);

      if (window.innerWidth > 1024) {
        canvas.onmousemove = (event: MouseEvent) => {
          gradientLineMouseOver(event, box, canvas, labels, datasets, gradientLineOptions);
        };
      }

      const redrawGradientLineChart = () => {
        drawGradientLineChart(box, canvas, labels, datasets, gradientLineOptions);
      };

      window.addEventListener("resize", redrawGradientLineChart);

      return () => {
        window.removeEventListener("resize", redrawGradientLineChart);
      };
    }
  }, [boxRef.current, canvasRef.current, labels, datasets]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
