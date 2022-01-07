import { FC } from "react";
import styled, { keyframes, css } from "styled-components";
import { ReactComponent as Pointer } from "images/pointer.svg";
import { Text } from "./Text";
import { windDirectionName } from "utils";

interface IIndicatorWrapperProps {
  size?: number;
}
const IndicatorWrapper = styled.div<IIndicatorWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  svg {
    width: ${({ size }) => `${size}rem`};
    height: ${({ size }) => `${size}rem`};
  }

  ${Text} {
    margin-left: 1.6rem;
  }
`;

const rotate = (windDirection: number) => keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(${windDirection}deg) }
`;

interface IPointerWrapperProps {
  windDirection: number;
}
const PointerWrapper = styled.div<IPointerWrapperProps>`
  animation: ${({ windDirection }) =>
    css`
      ${rotate(windDirection)} 0.5s linear forwards
    `};
`;

interface IWindIndicatorProps {
  windDirection?: number;
  size?: number;
  onlyIcon?: boolean;
  fontSize?: TTextSize;
}

export const WindIndicator: FC<IWindIndicatorProps> = ({ windDirection = 0, size = 3, onlyIcon = false, fontSize }) => {
  return (
    <IndicatorWrapper size={size}>
      <PointerWrapper windDirection={windDirection}>
        <Pointer />
      </PointerWrapper>

      {!onlyIcon ? (
        <Text size={fontSize || "md"} weight="bold">
          {windDirectionName(windDirection)}
        </Text>
      ) : null}
    </IndicatorWrapper>
  );
};
