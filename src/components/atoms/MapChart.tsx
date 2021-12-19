import { FC, useRef, useEffect, useLayoutEffect } from "react";
import { geoMercator, geoPath, geoContains } from "d3-geo";
import { koreaGeoJson } from "configs";
import { Box } from "./Box";

const drawMap = (box: HTMLDivElement, canvas: HTMLCanvasElement, hoverCity?: string) => {
  const { clientWidth, clientHeight } = box;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = clientWidth;
  canvas.height = clientHeight;

  const projection = geoMercator().fitSize([clientWidth, clientHeight], koreaGeoJson);
  const pathGenerator = geoPath(projection);

  koreaGeoJson.features.forEach((feature) => {
    const featureCanvas = document.createElement("canvas");
    const featureCtx = featureCanvas.getContext("2d");

    const city = feature?.properties?.CTP_KOR_NM || "";
    const bound = pathGenerator.bounds(feature);
    const bounds = {
      x1: bound[0][0],
      x2: bound[1][0],
      y1: bound[0][1],
      y2: bound[1][1],
    };

    if (!featureCtx) return;

    featureCanvas.width = bounds.x2 - bounds.x1;
    featureCanvas.height = bounds.y2 - bounds.y1;

    featureCtx.beginPath();
    featureCtx.translate(-bounds.x1, -bounds.y1);

    pathGenerator.context(featureCtx)(feature);

    if (city === hoverCity) {
      featureCtx.globalAlpha = 0.7;
    } else {
      featureCtx.globalAlpha = 0.3;
    }

    featureCtx.fillStyle = "blue";
    featureCtx.fill();

    featureCtx.globalAlpha = 1;
    featureCtx.lineWidth = 0.5;
    featureCtx.stroke();

    ctx.drawImage(featureCanvas, bounds.x1, bounds.y1, bounds.x2 - bounds.x1, bounds.y2 - bounds.y1);
  });
};

const getMousePostionCity = (event: MouseEvent, box: HTMLDivElement) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;
  const { clientWidth, clientHeight } = box;

  const projection = geoMercator().fitSize([clientWidth, clientHeight], koreaGeoJson);
  const position = projection.invert?.([mouseX, mouseY]);

  if (!position) return;

  for (const feature of koreaGeoJson.features) {
    if (geoContains(feature, position)) {
      const city = feature?.properties?.CTP_KOR_NM || "";

      return city;
    }
  }
};

const mapMouseOver = (event: MouseEvent, box: HTMLDivElement, canvas: HTMLCanvasElement) => {
  const hoverCity = getMousePostionCity(event, box);

  drawMap(box, canvas, hoverCity);
};

const mapMouseClick = (event: MouseEvent, box: HTMLDivElement, onClick: (city: string) => void) => {
  const city = getMousePostionCity(event, box);

  if (city && onClick) {
    onClick(city);
  }
};

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

      canvas.onmousemove = (event: MouseEvent) => {
        mapMouseOver(event, box, canvas);
      };

      if (onClick) {
        canvas.onclick = (event: MouseEvent) => {
          mapMouseClick(event, box, onClick);
        };
      }
    }
  }, [boxRef.current, canvasRef.current, onClick]);

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
