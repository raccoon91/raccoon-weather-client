import { useRef, useEffect } from "react";
import { geoMercator, geoPath } from "d3-geo";
import styled from "styled-components";
import { koreaGeoJson } from "configs";

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const MapChart = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;

    if (wrapper && canvas) {
      const { clientWidth, clientHeight } = wrapper;
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
    }
  }, [wrapperRef.current, canvasRef.current]);

  return (
    <CanvasWrapper ref={wrapperRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasWrapper>
  );
};
