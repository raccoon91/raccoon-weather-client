import styled from "styled-components";

interface ICardProps {
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
  r?: string;
}

export const Card = styled.div<ICardProps>`
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
  background-color: ${({ bgc, theme }) => theme.color[bgc || "white"]};
  border-radius: ${({ r }) => r || "20px"};
`;
