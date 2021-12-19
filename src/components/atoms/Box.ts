import styled from "styled-components";

interface IBoxProps {
  po?: string;
  t?: string;
  r?: string;
  b?: string;
  l?: string;
  o?: string;
  d?: string;
  f?: string;
  fd?: string;
  fw?: string;
  a?: string;
  j?: string;
  w?: string;
  minw?: string;
  h?: string;
  m?: string;
  p?: string;
  bgc?: string;
  btlr?: string;
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
  display: ${({ d }) => d || "flex"};
  ${({ f }) => f && `flex: ${f};`}
  flex-direction: ${({ fd }) => fd || "column"};
  ${({ fw }) => fw && `flex-wrap: ${fw};`}
  ${({ a }) => a && `align-items: ${a};`}
  ${({ j }) => j && `justify-content: ${j};`}
  ${({ w }) => w && `width: ${w};`}
  ${({ minw }) => minw && `min-width: ${minw};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ bgc, theme }) => bgc && `background-color: ${theme.color[bgc] || "none"};`}
  ${({ btlr }) => btlr && `border-top-left-radius: ${btlr};`}
  ${({ op }) => op && `opacity: ${op};`}
  ${({ z }) => z && `z-index: ${z};`}
`;
