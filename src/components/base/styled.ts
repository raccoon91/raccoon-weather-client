import styled from "styled-components";

export const Layout = styled.div`
  overflow: auto;
  width: 100vw;
  height: 100vh;
  padding: 20px 80px 60px;
  background-color: #f7f7f7;
`;

interface IBoxProps {
  width?: string;
  height?: string;
  margin?: string;
}
export const Box = styled.div<IBoxProps>`
  width: ${({ width }) => width || "unset"};
  height: ${({ height }) => height || "unset"};
  margin: ${({ margin }) => margin || "unset"};
`;

interface IFlexBoxProps {
  direction?: string;
  alignItems?: string;
  justifyContent?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
}
export const FlexBox = styled.div<IFlexBoxProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  width: ${({ width }) => width || "unset"};
  height: ${({ height }) => height || "unset"};
  margin: ${({ margin }) => margin || "unset"};
  padding: ${({ padding }) => padding || "unset"};
`;

interface IH1Props {
  margin?: string;
  padding?: string;
  color?: string;
  size?: string;
  weight?: string;
}
export const H1 = styled.h1<IH1Props>`
  margin: ${({ margin }) => margin || "unset"};
  padding: ${({ padding }) => padding || "unset"};
  color: ${({ color }) => color || "unset"};
  font-size: ${({ size }) => size || "unset"};
  font-weight: ${({ weight }) => weight || "unset"};
`;

interface IH2Props {
  margin?: string;
  padding?: string;
  color?: string;
  size?: string;
  weight?: string;
}
export const H2 = styled.h2<IH2Props>`
  margin: ${({ margin }) => margin || "unset"};
  padding: ${({ padding }) => padding || "unset"};
  color: ${({ color }) => color || "unset"};
  font-size: ${({ size }) => size || "unset"};
  font-weight: ${({ weight }) => weight || "unset"};
`;

interface IH3Props {
  margin?: string;
  padding?: string;
  color?: string;
  size?: string;
  weight?: string;
}
export const H3 = styled.h3<IH3Props>`
  margin: ${({ margin }) => margin || "unset"};
  padding: ${({ padding }) => padding || "unset"};
  color: ${({ color }) => color || "unset"};
  font-size: ${({ size }) => size || "unset"};
  font-weight: ${({ weight }) => weight || "unset"};
`;

interface ITextProps {
  margin?: string;
  padding?: string;
  color?: string;
  size?: string;
  weight?: string;
}
export const Text = styled.p<ITextProps>`
  margin: ${({ margin }) => margin || "unset"};
  padding: ${({ padding }) => padding || "unset"};
  color: ${({ color }) => color || "unset"};
  font-size: ${({ size }) => size || "unset"};
  font-weight: ${({ weight }) => weight || "unset"};
`;

interface IButtonProps {
  width?: string;
  height?: string;
  margin?: string;
  bgcolor?: string;
  color?: string;
  size?: string;
}
export const Button = styled.button<IButtonProps>`
  width: ${({ width }) => width || "unset"};
  height: ${({ height }) => height || "unset"};
  margin: ${({ margin }) => margin || "unset"};
  background-color: ${({ bgcolor }) => bgcolor || "unset"};
  border: none;
  border-radius: 5px;
  color: ${({ color }) => color || "black"};
  size: ${({ size }) => size || "unset"};
  line-height: ${({ height }) => height || "unset"};
  cursor: pointer;
`;
