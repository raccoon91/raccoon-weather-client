import { FC } from "react";
import styled from "styled-components";
import Sunny from "images/animations/day.svg";

interface IStyledImageProps {
  size?: string | number;
}

const StyledImage = styled.img<IStyledImageProps>`
  width: ${({ size }) => (size ? `${size}rem` : "10rem")};
  height: ${({ size }) => (size ? `${size}rem` : "10rem")};
  user-select: none;
`;

interface IAnimationIconProps {
  type: string;
  size?: string | number;
}

export const AnimationIcon: FC<IAnimationIconProps> = ({ type, size }) => {
  return <StyledImage src={Sunny} alt={type} size={size} />;
};
