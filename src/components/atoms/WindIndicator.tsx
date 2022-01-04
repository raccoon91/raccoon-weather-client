import { FC } from "react";
import styled from "styled-components";
import { ReactComponent as Pointer } from "images/pointer.svg";
import { Text } from "./Text";

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

interface IPointerWrapperProps {
  windDirection: number;
}

const PointerWrapper = styled.div<IPointerWrapperProps>`
  transform: ${({ windDirection }) => `rotate(${windDirection}deg)`};
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
          북동쪽
        </Text>
      ) : null}
    </IndicatorWrapper>
  );
};
