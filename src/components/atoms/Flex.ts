import styled from "styled-components";

interface IFlexProps {
  o?: string;
  f?: string;
  d?: string;
  fw?: string;
  a?: string;
  j?: string;
  w?: string;
  h?: string;
  m?: string;
  p?: string;
  bgc?: string;
}

export const Flex = styled.div<IFlexProps>`
  ${({ o }) => o && `overflow: ${o};`}
  display: flex;
  ${({ f }) => f && `flex: ${f};`}
  flex-direction: ${({ d }) => d || "column"};
  ${({ fw }) => fw && `flex-wrap: ${fw};`}
  ${({ a }) => a && `align-items: ${a};`}
  ${({ j }) => j && `justify-content: ${j};`}
  ${({ w }) => w && `width: ${w};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ bgc, theme }) => bgc && `background-color: ${theme.color[bgc] || "none"};`}
`;
