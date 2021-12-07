import styled from "styled-components";

interface IBoxProps {
  o?: string;
  d?: string;
  f?: string;
  fd?: string;
  a?: string;
  j?: string;
  w?: string;
  minw?: string;
  h?: string;
  m?: string;
  p?: string;
  bgc?: string;
  btlr?: string;
}

export const Box = styled.div<IBoxProps>`
  ${({ o }) => o && `overflow: ${o};`}
  display: ${({ d }) => d || "flex"};
  ${({ f }) => f && `flex: ${f};`}
  flex-direction: ${({ fd }) => fd || "column"};
  ${({ a }) => a && `align-items: ${a};`}
  ${({ j }) => j && `justify-content: ${j};`}
  ${({ w }) => w && `width: ${w};`}
  ${({ minw }) => minw && `min-width: ${minw};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ bgc, theme }) => bgc && `background-color: ${theme.color[bgc] || "none"};`}
  ${({ btlr }) => btlr && `border-top-left-radius: ${btlr};`}
`;
