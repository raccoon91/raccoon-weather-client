import styled from "styled-components";

interface ImageProps {
  size?: number;
  m?: string;
  p?: string;
}

export const Image = styled.img<ImageProps>`
  ${({ size }) =>
    size &&
    `
    width: ${size}rem;
    height: ${size}rem;
  `}
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
`;
