import styled from "styled-components";

interface ITitleProps {
  m?: string;
  p?: string;
  color?: string;
  size?: TTitleSize;
  weight?: string;
}

export const Title1 = styled.h1<ITitleProps>`
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.titleSize[size || "3xl"]};
  font-weight: ${({ weight }) => weight || "bold"};
  user-select: none;
`;

export const Title2 = styled.h2<ITitleProps>`
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.titleSize[size || "2xl"]};
  font-weight: ${({ weight }) => weight || "bold"};
  user-select: none;
`;

export const Title3 = styled.h3<ITitleProps>`
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.titleSize[size || "xl"]};
  font-weight: ${({ weight }) => weight || "bold"};
  user-select: none;
`;

export const Title4 = styled.h4<ITitleProps>`
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.titleSize[size || "lg"]};
  font-weight: ${({ weight }) => weight || "bold"};
  user-select: none;
`;

export const Title5 = styled.h5<ITitleProps>`
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.titleSize[size || "md"]};
  font-weight: ${({ weight }) => weight || "bold"};
  user-select: none;
`;

export const Title6 = styled.h6<ITitleProps>`
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ color, theme }) => color && `color: ${theme.color[color] || "black"};`}
  font-size: ${({ theme, size }) => theme.titleSize[size || "sm"]};
  font-weight: ${({ weight }) => weight || "bold"};
  user-select: none;
`;
