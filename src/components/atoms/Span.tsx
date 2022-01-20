import styled from "styled-components";

interface ISpanProps {
  m?: string;
  p?: string;
  color?: TColor;
  size?: TTextSize;
  weight?: string;
  align?: string;
}

export const Span = styled.span<ISpanProps>`
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.textSize[size || "sm"]};
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ align }) => align && `text-align: ${align};`}
  user-select: none;
`;
