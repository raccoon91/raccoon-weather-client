import styled from "styled-components";

interface IBoxProps {
  po?: string;
  t?: string;
  r?: string;
  b?: string;
  l?: string;
  o?: string;
  w?: string;
  minw?: string;
  maxw?: string;
  h?: string;
  m?: string;
  p?: string;
  br?: string;
  bgc?: string;
  op?: string;
  z?: string;
}

export const Box = styled.div<IBoxProps>`
  ${({ po }) => po && `position: ${po};`}
  ${({ t }) => t && `top: ${t};`}
  ${({ r }) => r && `right: ${r};`}
  ${({ b }) => b && `bottom: ${b};`}
  ${({ l }) => l && `left: ${l};`}
  ${({ o }) => o && `overflow: ${o};`}
  ${({ w }) => w && `width: ${w};`}
  ${({ minw }) => minw && `min-width: ${minw};`}
  ${({ maxw }) => maxw && `max-width: ${maxw};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ br }) => br && `border-radius: ${br};`}
  ${({ bgc, theme }) => bgc && `background-color: ${theme.color[bgc] || "none"};`}
  ${({ op }) => op && `opacity: ${op};`}
  ${({ z }) => z && `z-index: ${z};`}
`;
