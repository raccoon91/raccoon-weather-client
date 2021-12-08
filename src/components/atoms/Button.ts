import styled from "styled-components";

interface IButtonProps {
  variant?: string;
  m?: string;
  p?: string;
  color?: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  weight?: string;
}

export const Button = styled.button<IButtonProps>`
  ${({ variant, theme }) => theme.variant(variant)}
  ${({ m }) => m && `margin: ${m};`}
  padding: ${({ p }) => p || "6px 12px"};
  border-radius: 5px;
  font-size: ${({ theme, size }) => theme.textSize[size || "lg"]};
  ${({ weight }) => weight && `font-weight: ${weight};`}
  cursor: pointer;
  user-select: none;
`;
