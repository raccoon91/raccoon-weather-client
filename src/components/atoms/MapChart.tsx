import { useRef, useEffect, useLayoutEffect } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { koreaGeoJson } from "configs";
import { Box } from "./Box";

const drawMap = (box: HTMLDivElement, canvas: HTMLCanvasElement) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const projection = geoMercator().fitSize([clientWidth, clientHeight], koreaGeoJson).precision(100);
  const pathGenerator = geoPath(projection, ctx);

  ctx.beginPath();

  pathGenerator(koreaGeoJson);

  ctx.fillStyle = "blue";
  ctx.globalAlpha = 0.3;
  ctx.fill();

  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 1;
  ctx.stroke();
};

export const MapChart = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas) {
      drawMap(box, canvas);
    }
  }, [boxRef.current, canvasRef.current]);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (box && canvas) {
      const redrawMap = () => {
        drawMap(box, canvas);
      };

      window.addEventListener("resize", redrawMap);

      return () => {
        window.removeEventListener("resize", redrawMap);
      };
    }
  }, [boxRef.current, canvasRef.current]);

  return (
    <Box w="100%" h="100%" ref={boxRef}>
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
};
