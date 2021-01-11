import React, { FC } from "react";
import styled from "styled-components";
import { FlexBox, H2 } from "./styled";

const CardContainer = styled.div`
  width: 100%;
  padding: 0 10px;
  background-color: #fff;
  border: 1px solid #e6e9ed;
`;

const CardTitleWrapper = styled(FlexBox)`
  border-bottom: 1px solid #e6e9ed;
`;

interface ICardProps {
  title: string;
  option?: JSX.Element;
  children?: JSX.Element;
}

export const Card: FC<ICardProps> = ({ title, option, children }) => {
  return (
    <CardContainer>
      <CardTitleWrapper height="48px" justifyContent="space-between" padding="0 10px">
        <H2 size="18px" weight="bold" color="#73879c">
          {title}
        </H2>
        {option}
      </CardTitleWrapper>
      {children || null}
    </CardContainer>
  );
};
