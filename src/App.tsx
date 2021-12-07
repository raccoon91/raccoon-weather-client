import { FC } from "react";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "configs";
import Pages from "pages";

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Pages />
    </ThemeProvider>
  );
};
