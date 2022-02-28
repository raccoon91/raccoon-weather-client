import styled from "styled-components";

interface ILabelProps {
  w?: string;
  minw?: string;
  maxw?: string;
  h?: string;
  m?: string;
  p?: string;
  bc?: TColor;
  br?: string;
  size?: TTextSize;
}

export const Label = styled.label<ILabelProps>`
  ${({ w }) => w && `width: ${w};`}
  ${({ minw }) => minw && `min-width: ${minw};`}
  ${({ maxw }) => maxw && `max-width: ${maxw};`}
  height: ${({ h }) => h || "4rem"};
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  line-height: ${({ h }) => h || "4rem"};
  font-size: ${({ theme, size }) => theme.textSize[size || "md"]};
  user-select: none;
`;
