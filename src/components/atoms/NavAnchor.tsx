import React, { FC } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface IStyledNavLinkProps {
  m?: string;
  p?: string;
  color?: string;
  size?: TTextSize;
  weight?: string;
}

const StyledNavLink = styled(NavLink)<IStyledNavLinkProps>`
  display: inline-block;
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ theme, size }) => size && `font-size: ${theme.textSize[size || "lg"]};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  color: ${({ color, theme }) => theme.color[color || "black"]};
  text-decoration: none;
  user-select: none;
  opacity: 0.4;

  &.active,
  &:hover {
    opacity: 1;
  }
`;

interface INavAnchorProps {
  to: string;
  m?: string;
  p?: string;
  color?: string;
  size?: TTextSize;
  weight?: string;
  exact?: boolean;
  children?: string | React.ReactNode;
}

export const NavAnchor: FC<INavAnchorProps> = ({ to, exact, children, ...style }) => {
  return (
    <StyledNavLink to={to} exact={exact} activeClassName="active" {...style}>
      {children}
    </StyledNavLink>
  );
};
