import { FC } from "react";
import styled from "styled-components";
import Sunny from "images/weather/day.svg";

interface IStyledImageProps {
  size?: string | number;
}

const StyledImage = styled.img<IStyledImageProps>`
  width: ${({ size }) => (size ? `${size}rem` : "10rem")};
  height: ${({ size }) => (size ? `${size}rem` : "10rem")};
  user-select: none;
`;

interface IWeatherIconProps {
  type: number;
  size?: string | number;
}

export const WeatherIcon: FC<IWeatherIconProps> = ({ type, size }) => {
  return <StyledImage src={Sunny} alt={`${type}`} size={size} />;
};
