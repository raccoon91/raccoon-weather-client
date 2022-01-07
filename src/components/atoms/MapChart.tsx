import { FC, useRef, useEffect } from "react";
import { drawMap, mapMouseOver, mapMouseClick } from "utils";
import { Box } from "./Box";

interface IMapChartProps {
  onClick?: (city: string) => void;
}

export const MapChart: FC<IMapChartProps> = ({ onClick }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas) {
      drawMap(box, canvas);

      const redrawMap = () => {
        drawMap(box, canvas);
      };

      window.addEventListener("resize", redrawMap);

      return () => {
        window.removeEventListener("resize", redrawMap);
      };
    }
  }, [boxRef.current, canvasRef.current]);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas) {
      if (window.innerWidth > 1024) {
        canvas.onmousemove = (event: MouseEvent) => {
          mapMouseOver(event, box, canvas);
        };
      }

      if (onClick) {
        canvas.onclick = (event: MouseEvent) => {
          mapMouseClick(event, box, onClick);
        };
      }
    }
  }, [boxRef.current, canvasRef.current, onClick]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
