import { FC } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "configs";
import store from "stores";
import Pages from "pages";

export const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <Pages />
      </ThemeProvider>
    </Provider>
  );
};
