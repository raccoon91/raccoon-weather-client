import { FC, useRef, useEffect } from "react";
import {
  mergeCanvasOptions,
  getChartDataRange,
  animateGradientLineChart,
  drawGradientLineChart,
  gradientLineMouseOver,
} from "utils";
import { gradientLineChartDefaultOptions } from "configs";
import { Box } from "./Box";
import { Tooltip } from "./Tooltip";

interface IGradientLineChartProps {
  labels?: string[] | null;
  datasets?: number[] | null;
  options?: ICanvasOptions;
}

export const GradientLineChart: FC<IGradientLineChartProps> = ({ labels, datasets, options }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;

    if (box && canvas && tooltip && labels?.length && datasets?.length) {
      const gradientLineOptions = mergeCanvasOptions(gradientLineChartDefaultOptions, options);
      const dataRange = getChartDataRange(datasets, gradientLineOptions.data);

      if (gradientLineOptions.animation.on) {
        animateGradientLineChart(box, canvas, labels, datasets, dataRange, gradientLineOptions);
      } else {
        drawGradientLineChart(box, canvas, tooltip, labels, datasets, dataRange, gradientLineOptions);
      }

      if (window.innerWidth > 1024) {
        setTimeout(() => {
          canvas.onmousemove = (event: MouseEvent) => {
            gradientLineMouseOver(event, box, canvas, tooltip, labels, datasets, dataRange, gradientLineOptions);
          };
        }, gradientLineOptions.animation.duration * 1000);
      }

      const redrawGradientLineChart = () => {
        drawGradientLineChart(box, canvas, tooltip, labels, datasets, dataRange, gradientLineOptions);
      };

      window.addEventListener("resize", redrawGradientLineChart);

      return () => {
        window.removeEventListener("resize", redrawGradientLineChart);
      };
    }
  }, [boxRef.current, canvasRef.current, tooltipRef.current, labels, datasets]);

  return (
    <Box ref={boxRef} po="relative" w="100%" h="100%">
      <canvas ref={canvasRef} />
      <Tooltip ref={tooltipRef} />
    </Box>
  );
};
