import { FC, useRef, useEffect } from "react";
import { mergeCanvasOptions, getChartDataRange, animateLineChart, drawLineChart, lineChartMouseOver } from "utils";
import { lineChartDefaultOptions } from "configs";
import { Box } from "./Box";
import { Tooltip } from "./Tooltip";

interface ILineChartProps {
  labels?: string[] | null;
  datasets?: number[] | null;
  options?: ICanvasOptionsPrpos;
}

export const LineChart: FC<ILineChartProps> = ({ labels = [], datasets, options }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;

    if (box && canvas && tooltip && datasets?.length) {
      const lineOptions = mergeCanvasOptions(lineChartDefaultOptions, options);
      const dataRange = getChartDataRange(datasets, lineOptions.data);

      if (lineOptions.animation.on) {
        animateLineChart(box, canvas, labels, datasets, dataRange, lineOptions);
      } else {
        drawLineChart(box, canvas, tooltip, labels, datasets, dataRange, lineOptions);
      }

      if (window.innerWidth > 1024) {
        setTimeout(() => {
          canvas.onmousemove = (event: MouseEvent) => {
            lineChartMouseOver(event, box, canvas, tooltip, labels, datasets, dataRange, lineOptions);
          };
        }, lineOptions.animation.duration * 1000);

        canvas.onmouseleave = () => {
          tooltip.style.opacity = "0";
        };
      }

      const redrawLineChart = () => {
        drawLineChart(box, canvas, tooltip, labels, datasets, dataRange, lineOptions);
      };

      window.addEventListener("resize", redrawLineChart);

      return () => {
        window.removeEventListener("resize", redrawLineChart);
      };
    }
  }, [boxRef.current, canvasRef.current, tooltipRef.current, datasets]);

  return (
    <Box po="relative" w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef} />
      <Tooltip ref={tooltipRef} />
    </Box>
  );
};
