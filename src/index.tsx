import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { RootStore } from "src/stores";
import { App } from "src/App";
import GlobalStyle from "./globalStyled";

const rootStore = new RootStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
