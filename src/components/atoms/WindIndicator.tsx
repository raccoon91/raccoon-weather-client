import { FC } from "react";
import styled from "styled-components";
import { Text } from "./Text";
import { ReactComponent as Pointer } from "images/pointer.svg";

interface IIndicatorWrapperProps {
  size?: number;
}

const IndicatorWrapper = styled.div<IIndicatorWrapperProps>`
  display: flex;
  align-items: center;
  width: 100%;

  svg {
    width: ${({ size }) => `${size}rem`};
    height: ${({ size }) => `${size}rem`};
  }

  ${Text} {
    margin-left: 1.6rem;
  }
`;

interface IWindIndicatorProps {
  size?: number;
  onlyIcon?: boolean;
  fontSize?: TTextSize;
}

export const WindIndicator: FC<IWindIndicatorProps> = ({ size = 2.5, onlyIcon = false, fontSize }) => {
  return (
    <IndicatorWrapper size={size}>
      <Pointer />

      {!onlyIcon ? (
        <Text size={fontSize || "md"} weight="bold">
          북동쪽
        </Text>
      ) : null}
    </IndicatorWrapper>
  );
};
