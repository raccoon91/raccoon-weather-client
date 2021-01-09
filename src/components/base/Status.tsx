import React, { FC } from "react";
import styled from "styled-components";
import { FlexBox, Box, Text, H3 } from "./styled";

interface IStatusContainerProps {
  isDropArea?: boolean;
}

const StatusContainer = styled(Box)<IStatusContainerProps>`
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

const StatusTitle = styled(H3)`
  @media (max-width: 900px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StatusText = styled(Text)`
  @media (max-width: 900px) {
    font-size: 22px;
  }
`;

const StatusUnit = styled(Text)`
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

interface IStatusProps {
  title: string;
  value: number | string | null;
  unit?: string;
  subValue?: string | null;
  subIcon?: string | JSX.Element | null;
  draggable?: boolean;
  position?: string | number;
  onDragStart?: any;
  onDragOver?: any;
  onDrop?: any;
  onDragLeave?: any;
  isDropArea?: boolean;
}

export const Status: FC<IStatusProps> = ({
  title,
  value,
  unit,
  subValue,
  subIcon,
  draggable,
  onDragStart,
  position,
  onDragOver,
  onDrop,
  onDragLeave,
  isDropArea,
}) => {
  return (
    <StatusContainer
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
      data-position={position}
      isDropArea={isDropArea}
    >
      <StatusTitle size="14px" margin="0 0 8px 0">
        {title}
      </StatusTitle>
      <FlexBox justifyContent="flex-start" height="36px" margin="0 0 5px 0">
        <StatusText size="28px" weight="bold">
          {value || "-"}
        </StatusText>
        {value && unit && isNumeric(value) && (
          <StatusUnit size="20px" margin="8px 0 0 10px">
            {unit}
          </StatusUnit>
        )}
      </FlexBox>
      {subValue ? (
        <SubValueBox justifyContent="flex-start">
          {subIcon && subIcon}
          <Text size="14px" weight="bold">
            {subValue}
          </Text>
        </SubValueBox>
      ) : null}
    </StatusContainer>
  );
};
