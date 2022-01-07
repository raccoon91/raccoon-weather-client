import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import Day from "images/animations/day.svg";
import Night from "images/animations/night.svg";
import Cloud from "images/animations/cloudy.svg";
import CloudDay from "images/animations/cloudy-day.svg";
import CloudNight from "images/animations/cloudy-night.svg";
import RainyDay from "images/animations/rainy-day.svg";
import RainyNight from "images/animations/rainy-night.svg";
import RainyDrop from "images/animations/rainy-drop.svg";
import SnowyDay from "images/animations/snowy-day.svg";
import SnowyNight from "images/animations/snowy-night.svg";
import { getWeatherType } from "utils";

interface IWeatherType {
  icon: string;
  name: string;
}

const weatherTypeDictionary: { [type: string]: IWeatherType } = {
  day: { icon: Day, name: "day" },
  night: { icon: Night, name: "night" },
  cloud: { icon: Cloud, name: "cloud" },
  cloudDay: { icon: CloudDay, name: "cloudDay" },
  cloudNight: { icon: CloudNight, name: "cloudNight" },
  rainyDay: { icon: RainyDay, name: "rainyDay" },
  rainyNight: { icon: RainyNight, name: "rainyNight" },
  rainyDrop: { icon: RainyDrop, name: "rainyDrop" },
  snowyDay: { icon: SnowyDay, name: "snowyDay" },
  snowyNight: { icon: SnowyNight, name: "snowyNight" },
};

interface IStyledImageProps {
  size?: string | number;
}

const StyledImageWrapper = styled.div<IStyledImageProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => (size ? `${size}rem` : "10rem")};
  height: ${({ size }) => (size ? `${size}rem` : "10rem")};
`;

const StyledImage = styled.img<IStyledImageProps>`
  width: ${({ size }) => (size ? `${size}rem` : "10rem")};
  height: ${({ size }) => (size ? `${size}rem` : "10rem")};
  transform: scale(1.5);
  user-select: none;
`;

interface IAnimationIconProps {
  sky: number;
  rainType: number;
  date?: string;
  size?: string | number;
  imageSize?: string | number;
}

export const AnimationIcon: FC<IAnimationIconProps> = ({ sky, rainType, date, size, imageSize }) => {
  const [weatherType, setWeatherType] = useState<IWeatherType | null>(null);

  useEffect(() => {
    const weatherType = getWeatherType(sky, rainType, date);
    setWeatherType(weatherTypeDictionary[weatherType]);
  }, [sky, rainType, date]);

  return (
    <StyledImageWrapper size={size}>
      {weatherType ? <StyledImage src={weatherType.icon} alt={weatherType.name} size={imageSize || size} /> : null}
    </StyledImageWrapper>
  );
};
