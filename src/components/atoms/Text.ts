import styled from "styled-components";

interface ITextProps {
  color?: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  weight?: string;
}

export const Text = styled.p<ITextProps>`
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.textSize[size || "sm"] || "sm"};
  ${({ weight }) => weight && `font-weight: ${weight};`}
  user-select: none;
`;
