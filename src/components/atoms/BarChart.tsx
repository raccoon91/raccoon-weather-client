import { FC, useRef, useEffect } from "react";
import { mergeCanvasOptions, getChartDataRange, animateBarChart, drawBarChart, barChartMouseOver } from "utils";
import { barChartDefaultOptions } from "configs";
import { Box } from "./Box";
import { Tooltip } from "./Tooltip";

interface IBarChartProps {
  labels?: string[] | null;
  datasets?: number[] | null;
  options?: ICanvasOptions;
}

export const BarChart: FC<IBarChartProps> = ({ labels, datasets, options }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;

    if (box && canvas && tooltip && labels?.length && datasets?.length) {
      const barOptions = mergeCanvasOptions(barChartDefaultOptions, options);
      const dataRange = getChartDataRange(datasets, barOptions.data);

      if (barOptions.animation.on) {
        animateBarChart(box, canvas, labels, datasets, dataRange, barOptions);
      } else {
        drawBarChart(box, canvas, tooltip, labels, datasets, dataRange, barOptions);
      }

      if (window.innerWidth > 1024) {
        setTimeout(() => {
          canvas.onmousemove = (event: MouseEvent) => {
            barChartMouseOver(event, box, canvas, tooltip, labels, datasets, dataRange, barOptions);
          };
        }, barOptions.animation.duration * 1000);

        canvas.onmouseleave = () => {
          tooltip.style.opacity = "0";
        };
      }

      const redrawBarChart = () => {
        drawBarChart(box, canvas, tooltip, labels, datasets, dataRange, barOptions);
      };

      window.addEventListener("resize", redrawBarChart);

      return () => {
        window.removeEventListener("resize", redrawBarChart);
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
