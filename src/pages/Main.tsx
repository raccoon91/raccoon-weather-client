import React from "react";
import {
  CurrentWeather,
  MapChart,
  Climates,
  GlobalTemperatureChart,
} from "src/components/main";
import "./Main.scss";

export const Main = () => {
  return (
    <div className="main-container">
      <div className="main-header">
        <CurrentWeather />
      </div>

      <div className="main-content">
        <div className="main-map-chart">
          <MapChart />
        </div>

        <div className="main-climates">
          <Climates />
        </div>

        <div className="main-global-temp">
          <GlobalTemperatureChart />
        </div>
      </div>
    </div>
  );
};
