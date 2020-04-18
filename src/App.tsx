import React, { FC } from "react";
import styled from "styled-components";

import CurrentWeather from "./components/CurrentWeather";

const AppContainer = styled.div`
  width: 500px;
  min-height: 300px;
  border: 1px solid black;
`;

const App: FC = () => {
  return (
    <AppContainer>
      <CurrentWeather />
    </AppContainer>
  );
};

export default App;
