import styled from "styled-components";

interface IGridProps {
  po?: string;
  t?: string;
  r?: string;
  b?: string;
  l?: string;
  o?: string;
  gc?: string;
  gr?: string;
  gap?: string;
  w?: string;
  minw?: string;
  maxw?: string;
  h?: string;
  m?: string;
  p?: string;
  bgc?: TColor;
  z?: string;
}

export const Grid = styled.div<IGridProps>`
  ${({ po }) => po && `position: ${po};`}
  ${({ t }) => t && `top: ${t};`}
  ${({ r }) => r && `right: ${r};`}
  ${({ b }) => b && `bottom: ${b};`}
  ${({ l }) => l && `left: ${l};`}
  ${({ o }) => o && `overflow: ${o};`}
  display: grid;
  ${({ gap }) => gap && `grid-gap: ${gap};`}
  ${({ gr }) => gr && `grid-template-rows: ${gr};`}
  ${({ gc }) => gc && `grid-template-columns: ${gc};`}  
  ${({ w }) => w && `width: ${w};`}
  ${({ minw }) => minw && `min-width: ${minw};`}
  ${({ maxw }) => maxw && `max-width: ${maxw};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ bgc, theme }) => bgc && `background-color: ${theme.color[bgc] || "none"};`}
  ${({ z }) => z && `z-index: ${z};`}
`;
