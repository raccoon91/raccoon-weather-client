import { FC } from "react";
import styled from "styled-components";
import Sunny from "images/day.svg";

interface IStyledImageProps {
  size?: string | number;
}

const StyledImage = styled.img<IStyledImageProps>`
  width: ${({ size }) => (size ? `${size}rem` : "10rem")};
  height: ${({ size }) => (size ? `${size}rem` : "10rem")};
`;

interface IWeatherIconProps {
  type: string;
  size?: string | number;
}

export const WeatherIcon: FC<IWeatherIconProps> = ({ type, size }) => {
  return <StyledImage src={Sunny} alt={type} size={size} />;
};
