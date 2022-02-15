import styled from "styled-components";

interface IFormProps {
  w?: string;
  minw?: string;
  maxw?: string;
  h?: string;
  m?: string;
  p?: string;
  br?: string;
  bgc?: TColor;
  op?: string;
  z?: string;
}

export const Form = styled.form<IFormProps>`
  ${({ w }) => w && `width: ${w};`}
  ${({ minw }) => minw && `min-width: ${minw};`}
  ${({ maxw }) => maxw && `max-width: ${maxw};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ br }) => br && `border-radius: ${br};`}
  ${({ bgc, theme }) => bgc && `background-color: ${theme.color[bgc] || "none"};`}
  ${({ op }) => op && `opacity: ${op};`}
  ${({ z }) => z && `z-index: ${z};`}
`;
