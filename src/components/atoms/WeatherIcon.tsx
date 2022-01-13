import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import Day from "images/weather/day.svg";
import Night from "images/weather/night.svg";
import Cloud from "images/weather/cloudy.svg";
import CloudDay from "images/weather/cloudy-day.svg";
import CloudNight from "images/weather/cloudy-night.svg";
import RainyDay from "images/weather/rainy-day.svg";
import RainyNight from "images/weather/rainy-night.svg";
import RainyDrop from "images/weather/rainy-drop.svg";
import SnowyDay from "images/weather/snowy-day.svg";
import SnowyNight from "images/weather/snowy-night.svg";
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

interface IIconProps {
  size?: string | number;
}

const WeatherIconContainer = styled.div<IIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => (size ? `${size}rem` : "10rem")};
  height: ${({ size }) => (size ? `${size}rem` : "10rem")};
`;

const Icon = styled.img<IIconProps>`
  width: ${({ size }) => (size ? `${size}rem` : "10rem")};
  height: ${({ size }) => (size ? `${size}rem` : "10rem")};
  transform: scale(2);
  user-select: none;
`;

interface IWeatherIconProps {
  sky?: number;
  rainType?: number;
  date?: string;
  size?: string | number;
}

export const WeatherIcon: FC<IWeatherIconProps> = ({ sky, rainType, date, size }) => {
  const [weatherType, setWeatherType] = useState<IWeatherType | null>(null);

  useEffect(() => {
    const weatherType = getWeatherType(sky, rainType, date);

    if (weatherType) {
      setWeatherType(weatherTypeDictionary[weatherType]);
    }
  }, [sky, rainType, date]);

  return (
    <WeatherIconContainer size={size}>
      {weatherType ? <Icon src={weatherType.icon} alt={weatherType.name} size={size} /> : null}
    </WeatherIconContainer>
  );
};
