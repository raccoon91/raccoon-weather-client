import { FC, useRef, useEffect } from "react";
import { getChartDataRange, animateScatterPlot, drawScatterPlot, scatterPlotMouseOver } from "utils";
import { Box } from "./Box";

const scatterPlotDefaultOptions = {
  chart: {
    paddingX: 5,
    paddingY: 8,
    yAxisWidth: 25,
    xAxisHeight: 10,
  },
  draw: {
    paddingX: 5,
    paddingY: 5,
  },
  data: {
    min: 30,
    max: 38,
    range: 55,
  },
};

interface IScatterPlotProps {
  labels?: string[] | null;
  datasets?: number[][] | null;
  options?: ICanvasOptions;
}

export const ScatterPlot: FC<IScatterPlotProps> = ({ labels, datasets, options = scatterPlotDefaultOptions }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas && labels?.length && datasets?.length) {
      const scatterPlotOptions = {
        chart: { ...scatterPlotDefaultOptions.chart, ...options.chart },
        draw: { ...scatterPlotDefaultOptions.draw, ...options.draw },
        data: { ...scatterPlotDefaultOptions.data, ...options.data },
      };
      const dataRange = getChartDataRange(datasets, scatterPlotOptions.data);

      animateScatterPlot(box, canvas, labels, datasets, dataRange, scatterPlotOptions);

      if (window.innerWidth > 1024) {
        canvas.onmousemove = (event: MouseEvent) => {
          scatterPlotMouseOver(event, box, canvas, labels, datasets, dataRange, scatterPlotOptions);
        };
      }

      const redrawScatterPlot = () => {
        drawScatterPlot(box, canvas, labels, datasets, dataRange, scatterPlotOptions);
      };

      window.addEventListener("resize", redrawScatterPlot);

      return () => {
        window.removeEventListener("resize", redrawScatterPlot);
      };
    }
  }, [boxRef.current, canvasRef.current, labels, datasets]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
