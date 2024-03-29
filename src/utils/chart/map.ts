import { geoMercator, geoPath, geoContains } from "d3-geo";
import { createHiDPICanvas } from "./common";
import { koreaGeoJson } from "configs";
import { chartTheme } from "configs";

export const drawMap = (box: HTMLDivElement, canvas: HTMLCanvasElement, cityName: string, hoverCity?: string) => {
  const ctx = createHiDPICanvas(box, canvas);

  if (!ctx) return;

  const { clientWidth, clientHeight } = box;
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
    const featureWidth = bounds.x2 - bounds.x1;
    const featureHeight = bounds.y2 - bounds.y1;

    if (featureWidth < 1 || featureHeight < 1 || !featureCtx) return;

    featureCanvas.width = featureWidth;
    featureCanvas.height = featureHeight;

    featureCtx.beginPath();
    featureCtx.translate(-bounds.x1, -bounds.y1);

    pathGenerator.context(featureCtx)(feature);

    if (city === hoverCity) {
      featureCtx.globalAlpha = 0.7;
    } else if (city === cityName) {
      featureCtx.globalAlpha = 1;
    } else {
      featureCtx.globalAlpha = 0.5;
    }

    featureCtx.fillStyle = chartTheme.blue;
    featureCtx.fill();

    featureCtx.globalAlpha = 1;
    featureCtx.lineWidth = 0.5;
    featureCtx.stroke();

    ctx.drawImage(featureCanvas, bounds.x1, bounds.y1, featureWidth, featureHeight);
  });
};

export const getMousePostionCity = (event: MouseEvent, box: HTMLDivElement) => {
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

export const mapMouseOver = (event: MouseEvent, box: HTMLDivElement, canvas: HTMLCanvasElement, cityName: string) => {
  const hoverCity = getMousePostionCity(event, box);

  drawMap(box, canvas, cityName, hoverCity);
};

export const mapMouseClick = (event: MouseEvent, box: HTMLDivElement, onClick: (cityName: string) => void) => {
  const clickedCity = getMousePostionCity(event, box);

  if (clickedCity && onClick) {
    onClick(clickedCity);
  }
};
