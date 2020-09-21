import React from "react";
import {
  Header,
  MapChart,
  Climates,
  GlobalTemperatureChart,
} from "src/components";
import "./App.scss";

export const App = () => {
  return (
    <div className="app-container">
      <div className="app-top">
        <Header />
      </div>

      <div className="app-bottom">
        <div className="app-left">
          <MapChart />
          <GlobalTemperatureChart />
        </div>

        <div className="app-right">
          <Climates />
        </div>
      </div>
    </div>
  );
};
