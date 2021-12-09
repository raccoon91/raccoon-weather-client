import styled from "styled-components";

interface IButtonProps {
  variant?: TVariant;
  m?: string;
  p?: string;
  color?: string;
  size?: TTextSize;
  weight?: string;
}

export const Button = styled.button<IButtonProps>`
  ${({ variant, theme }) => theme.variant(variant)}
  ${({ m }) => m && `margin: ${m};`}
  padding: ${({ p }) => p || "0.6rem 1.2rem"};
  border-radius: 0.5rem;
  font-size: ${({ theme, size }) => theme.textSize[size || "lg"]};
  ${({ weight }) => weight && `font-weight: ${weight};`}
  cursor: pointer;
  user-select: none;
`;
