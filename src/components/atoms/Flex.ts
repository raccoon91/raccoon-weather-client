import styled from "styled-components";

interface IFlexProps {
  po?: string;
  t?: string;
  r?: string;
  b?: string;
  l?: string;
  o?: string;
  gc?: string;
  gr?: string;
  ga?: string;
  f?: string;
  d?: string;
  fw?: string;
  a?: string;
  j?: string;
  order?: string;
  w?: string;
  minw?: string;
  maxw?: string;
  h?: string;
  m?: string;
  p?: string;
  bgc?: TColor;
  z?: string;
}

export const Flex = styled.div<IFlexProps>`
  ${({ po }) => po && `position: ${po};`}
  ${({ t }) => t && `top: ${t};`}
  ${({ r }) => r && `right: ${r};`}
  ${({ b }) => b && `bottom: ${b};`}
  ${({ l }) => l && `left: ${l};`}
  ${({ o }) => o && `overflow: ${o};`}
  ${({ gr }) => gr && `grid-row: ${gr};`}
  ${({ gc }) => gc && `grid-column: ${gc};`}  
  ${({ ga }) => ga && `grid-area: ${ga};`}  
  display: flex;
  flex: ${({ f }) => f || "0 0 atuo"};
  flex-direction: ${({ d }) => d || "row"};
  ${({ fw }) => fw && `flex-wrap: ${fw};`}
  ${({ a }) => a && `align-items: ${a};`}
  ${({ j }) => j && `justify-content: ${j};`}
  ${({ order }) => order && `order: ${order};`}
  ${({ w }) => w && `width: ${w};`}
  ${({ minw }) => minw && `min-width: ${minw};`}
  ${({ maxw }) => maxw && `max-width: ${maxw};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ bgc, theme }) => bgc && `background-color: ${theme.color[bgc] || "none"};`}
  ${({ z }) => z && `z-index: ${z};`}
`;
