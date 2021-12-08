const color = {
  black: "#000000",
  white: "#ffffff",
  blue: "#4d99f0",
  skyBlue: "#d9ebff",
  gray: "#e8e8e8",
  darkGray: "#a9a9a9",
};

const textSize = {
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

const titleSize = {
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
};

const variant = (variant?: string): string => {
  switch (variant) {
    case "primary":
      return `
        background-color: ${color.blue};
        border: 2px solid ${color.blue};
        color: ${color.skyBlue};
      `;
    case "primary-outline":
      return `
        background-color: ${color.skyBlue};
        border: 2px solid ${color.blue};
        color: ${color.blue};
      `;
    default:
      return `
        background-color: ${color.blue};
        border: 2px solid ${color.blue};
        color: ${color.skyBlue};
      `;
  }
};

export const theme = {
  color,
  textSize,
  titleSize,
  variant,
};
