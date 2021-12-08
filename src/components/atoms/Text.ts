import styled from "styled-components";

interface ITextProps {
  m?: string;
  p?: string;
  color?: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
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
