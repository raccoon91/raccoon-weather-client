import type { DefaultTheme } from "styled-components";

const color: { [key in TColor]: string } = {
  black: "#000000",
  white: "#ffffff",
  blue: "#4d99f0",
  skyBlue: "#d9ebff",
  gray: "#e8e8e8",
  darkGray: "#a9a9a9",
  background: "#f8f8f8",
  red: "red",
  green: "green",
};

const textSize: { [key in TTextSize]: string } = {
  "2xs": "1.0rem",
  xs: "1.2rem",
  sm: "1.4rem",
  md: "1.6rem",
  lg: "1.8rem",
  xl: "2.0rem",
  "2xl": "2.6rem",
  "3xl": "3.2rem",
  "4xl": "3.8rem",
  "5xl": "4.4rem",
};

const titleSize: { [key in TTitleSize]: string } = {
  "2xs": "1.2rem",
  xs: "1.4rem",
  sm: "1.6rem",
  md: "1.8rem",
  lg: "2.1rem",
  xl: "2.4rem",
  "2xl": "3.6rem",
  "3xl": "4.8rem",
  "4xl": "6.0rem",
  "5xl": "7.2rem",
  "6xl": "8.4rem",
};

const variant = (variant?: TVariant): string => {
  switch (variant) {
    case "primary":
      return `
        background-color: ${color.blue};
        border: 0.2rem solid ${color.blue};
        color: ${color.skyBlue};
      `;
    case "primary-outline":
      return `
        background-color: ${color.skyBlue};
        border: 0.2rem solid ${color.blue};
        color: ${color.blue};
      `;
    default:
      return `
        background-color: ${color.blue};
        border: 0.2rem solid ${color.blue};
        color: ${color.skyBlue};
      `;
  }
};

const device = {
  desktop: "screen and (min-width: 1024px)",
  mobile: "screen and (max-width: 1023px)",
};

export const theme: DefaultTheme = {
  color,
  textSize,
  titleSize,
  variant,
  device,
};
