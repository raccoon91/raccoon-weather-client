import styled from "styled-components";

interface ITitleProps {
  color?: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  weight?: string;
}

export const Title1 = styled.h1<ITitleProps>`
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.titleSize[size || "3xl"] || "3xl"};
  font-weight: ${({ weight }) => weight || "bold"};
  user-select: none;
`;

export const Title2 = styled.h2<ITitleProps>`
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.titleSize[size || "2xl"] || "2xl"};
  font-weight: ${({ weight }) => weight || "bold"};
  user-select: none;
`;

export const Title3 = styled.h3<ITitleProps>`
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.titleSize[size || "xl"] || "xl"};
  font-weight: ${({ weight }) => weight || "bold"};
  user-select: none;
`;

export const Title4 = styled.h4<ITitleProps>`
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.titleSize[size || "lg"] || "lg"};
  font-weight: ${({ weight }) => weight || "bold"};
  user-select: none;
`;

export const Title5 = styled.h5<ITitleProps>`
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.titleSize[size || "md"] || "md"};
  font-weight: ${({ weight }) => weight || "bold"};
  user-select: none;
`;

export const Title6 = styled.h6<ITitleProps>`
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.titleSize[size || "sm"] || "sm"};
  font-weight: ${({ weight }) => weight || "bold"};
  user-select: none;
`;
