import styled from "styled-components";

interface IInputProps {
  w?: string;
  minw?: string;
  maxw?: string;
  h?: string;
  m?: string;
  p?: string;
  bc?: TColor;
  br?: string;
}

export const Input = styled.input<IInputProps>`
  width: ${({ w }) => w || "100%"};
  ${({ minw }) => minw && `min-width: ${minw};`}
  ${({ maxw }) => maxw && `max-width: ${maxw};`}
  height: ${({ h }) => h || "4rem"};
  ${({ m }) => m && `margin: ${m};`}
  padding: ${({ p }) => p || "0 0 0 1rem"};
  border: ${({ theme, bc }) => `1px solid ${theme.color[bc || "blue"]}`};
  border-radius: ${({ br }) => br || "0.3rem"};
  outline-color: ${({ theme }) => theme.color.blue};
`;
