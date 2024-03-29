import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "./Button";

interface IStyledLinkProps {
  m?: string;
  p?: string;
  color?: string;
  size?: TTextSize;
  weight?: string;
}

const StyledLink = styled(Link)<IStyledLinkProps>`
  display: inline-block;
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ theme, size }) => size && `font-size: ${theme.textSize[size || "lg"]};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  text-decoration: none;
  user-select: none;
`;

interface IAnchorProps {
  to: string;
  variant?: TVariant;
  m?: string;
  p?: string;
  color?: string;
  size?: TTextSize;
  weight?: string;
  children?: string | React.ReactNode;
}

export const Anchor: FC<IAnchorProps> = ({ to, variant, children, ...style }) => {
  if (variant) {
    return (
      <StyledLink to={to}>
        <Button variant={variant} {...style}>
          {children}
        </Button>
      </StyledLink>
    );
  }

  return (
    <StyledLink to={to} {...style}>
      {children}
    </StyledLink>
  );
};
