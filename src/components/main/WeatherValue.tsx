import React, { FC } from "react";
import styled from "styled-components";
import { FlexBox, Box, Text, H3 } from "src/components/base/styled";

import { ReactComponent as Up } from "src/images/up.svg";
import { ReactComponent as Down } from "src/images/down.svg";
import { ReactComponent as Smiling } from "src/images/smiling.svg";
import { ReactComponent as Smile } from "src/images/smile.svg";
import { ReactComponent as Sad } from "src/images/sad.svg";
import { ReactComponent as Angry } from "src/images/angry.svg";

interface IWeatherContainerProps {
  isDropArea?: boolean;
}

const WeatherContainer = styled(Box)<IWeatherContainerProps>`
  position: relative;
  width: 160px;
  height: 105px;
  padding: 10px 0 0 20px;
  color: ${({ isDropArea }) => (isDropArea ? "red" : "#73879c")};

  &::before {
    content: "";
    position: absolute;
    right: 0;
    width: 0;
    height: 65px;
    margin: 10px 0;
    border-left: 2px solid #adb2b5;
  }

  @media (max-width: 900px) {
    width: 100px;
    height: 80px;

    &::before {
      content: "";
      height: 45px;
    }
  }
`;

const WeatherTitle = styled(H3)`
  @media (max-width: 900px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const WeatherText = styled(Text)`
  @media (max-width: 900px) {
    font-size: 22px;
  }
`;

const WeatherUnit = styled(Text)`
  @media (max-width: 900px) {
    font-size: 14px;
  }
`;

const SubValueBox = styled(FlexBox)`
  svg {
    width: 14px;
    margin-right: 5px;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const isNumeric = (value: number | string): boolean => {
  value = String(value).replace(/^\s+|\s+$/g, "");
  const regex = /^[0-9]+(\.[0-9]+)?$/g;

  if (regex.test(value)) {
    value = value.replace(/,/g, "");
    return isNaN(Number(value)) ? false : true;
  } else {
    return false;
  }
};

const WeatherIcon = (subIcon?: string | null) => {
  if (!subIcon) return null;

  switch (subIcon) {
    case "temp-down":
      return <Down />;
    case "temp-up":
      return <Up />;
    case "air-smiling":
      return <Smiling />;
    case "air-smile":
      return <Smile />;
    case "air-sad":
      return <Sad />;
    case "air-angry":
      return <Angry />;
    default:
      return null;
  }
};

interface IWeatherProps {
  title: string;
  value: number | string | null;
  unit?: string;
  subValue?: string | null;
  subIcon?: string | null;
}

export const Weather: FC<IWeatherProps> = ({ title, value, unit, subValue, subIcon }) => {
  return (
    <WeatherContainer>
      <WeatherTitle size="14px" margin="0 0 8px 0">
        {title}
      </WeatherTitle>

      <FlexBox justifyContent="flex-start" height="36px" margin="0 0 5px 0">
        <WeatherText size="28px" weight="bold">
          {value || "-"}
        </WeatherText>
        {value && unit && isNumeric(value) && (
          <WeatherUnit size="20px" margin="8px 0 0 10px">
            {unit}
          </WeatherUnit>
        )}
      </FlexBox>

      {subValue ? (
        <SubValueBox justifyContent="flex-start">
          {WeatherIcon(subIcon)}
          <Text size="14px" weight="bold">
            {subValue}
          </Text>
        </SubValueBox>
      ) : null}
    </WeatherContainer>
  );
};
