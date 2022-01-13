import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "../src/configs";

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {story()}
  </ThemeProvider>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
  backgrounds: {
    default: "skyBlue",
    values: [
      {
        name: "skyBlue",
        value: "#d9ebff",
      },
      {
        name: "white",
        value: "#ffffff",
      },
    ],
  },
};
