import { FC, useRef, useEffect } from "react";
import styled from "styled-components";
import { parseDatasets, drawYAxis, drawXAxis } from "utils";

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface IScatterPlotProps {
  datasets: IChartData[];
}

export const ScatterPlot: FC<IScatterPlotProps> = ({ datasets }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;

    if (wrapper && canvas && datasets.length) {
      const { clientWidth, clientHeight } = wrapper;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = clientWidth;
      canvas.height = clientHeight;

      const width = clientWidth - 20;
      const height = clientHeight - 20;
      const { minX, maxX, minY, maxY } = parseDatasets(datasets);
      const rangeX = maxX - minX;
      const rangeY = maxY - minY;

      drawYAxis(ctx, height - 20, -40, 50);
      drawXAxis(ctx, width - 40, height - 20, minX, maxX);

      for (let i = 0; i < datasets.length; i++) {
        const x = Math.floor(((datasets[i].x - minX) * (width - 40)) / rangeX);
        const y = Math.floor(((datasets[i].value - minY) * (height - 40)) / rangeY);

        ctx.beginPath();
        ctx.arc(x + 40, y + 25, 3, 0, Math.PI * 2);
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "blue";
        ctx.fill();
      }

      return () => {
        ctx.clearRect(0, 0, clientWidth, clientHeight);
      };
    }
  }, [wrapperRef.current, canvasRef.current, datasets]);

  return (
    <CanvasWrapper ref={wrapperRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasWrapper>
  );
};
