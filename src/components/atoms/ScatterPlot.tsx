import { FC, useRef, useEffect } from "react";
import {
  mergeCanvasOptions,
  getChartDataRange,
  animateScatterPlot,
  drawScatterPlot,
  scatterPlotMouseOver,
} from "utils";
import { scatterPlotDefaultOptions } from "configs";
import { Box } from "./Box";
import { Tooltip } from "./Tooltip";

interface IScatterPlotProps {
  labels?: string[] | null;
  datasets?: number[][] | null;
  options?: ICanvasOptions;
}

export const ScatterPlot: FC<IScatterPlotProps> = ({ labels, datasets, options }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;

    if (box && canvas && tooltip && labels?.length && datasets?.length) {
      const scatterPlotOptions = mergeCanvasOptions(scatterPlotDefaultOptions, options);
      const dataRange = getChartDataRange(datasets, scatterPlotOptions.data);

      if (scatterPlotOptions.animation.on) {
        animateScatterPlot(box, canvas, labels, datasets, dataRange, scatterPlotOptions);
      } else {
        drawScatterPlot(box, canvas, tooltip, labels, datasets, dataRange, scatterPlotOptions);
      }

      if (window.innerWidth > 1024) {
        setTimeout(() => {
          canvas.onmousemove = (event: MouseEvent) => {
            scatterPlotMouseOver(event, box, canvas, tooltip, labels, datasets, dataRange, scatterPlotOptions);
          };
        }, scatterPlotOptions.animation.duration * 1000);

        canvas.onmouseleave = () => {
          tooltip.style.opacity = "0";
        };
      }

      const redrawScatterPlot = () => {
        drawScatterPlot(box, canvas, tooltip, labels, datasets, dataRange, scatterPlotOptions);
      };

      window.addEventListener("resize", redrawScatterPlot);

      return () => {
        window.removeEventListener("resize", redrawScatterPlot);
      };
    }
  }, [boxRef.current, canvasRef.current, tooltipRef.current, labels, datasets]);

  return (
    <Box po="relative" w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef} />
      <Tooltip ref={tooltipRef} />
    </Box>
  );
};
