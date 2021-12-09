import styled from "styled-components";
import { Text } from "./Text";
import Pointer from "images/pointer.svg";

const StyledWindIndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 2rem;
  padding: 0 1rem;
`;

const StyledIndicatorWrapper = styled.div`
  margin-right: 2rem;
`;

const StyledIndicator = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

export const WindIndicator = () => {
  return (
    <StyledWindIndicatorWrapper>
      <StyledIndicatorWrapper>
        <StyledIndicator src={Pointer} />
      </StyledIndicatorWrapper>
      <Text size="md" weight="bold">
        북동쪽
      </Text>
    </StyledWindIndicatorWrapper>
  );
};
