import styled from "styled-components";

interface ITextProps {
  m?: string;
  p?: string;
  color?: string;
  size?: TTextSize;
  weight?: string;
}

export const Text = styled.p<ITextProps>`
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.textSize[size || "sm"]};
  ${({ weight }) => weight && `font-weight: ${weight};`}
  user-select: none;
`;
