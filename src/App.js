import React from "react";
import GeoPath from "./components/GeoPath";
import GlobalAverageTemp from "./components/GlobalAverageTemp";
import "./App.scss";

const App = () => {
  return (
    <div className="app-container">
      <div className="app-left">
        <div className="card geo">
          <h2>Korea Weather</h2>
          <GeoPath />
        </div>
        <div className="card global">
          <h2>Global Average Temperature</h2>
          <GlobalAverageTemp />
        </div>
      </div>
      <div className="app-right">
        <div className="card temp">
          <h2>Temperature</h2>
        </div>
        <div className="card temp">
          <h2>Rain</h2>
        </div>
        <div className="card temp">
          <h2>Humidity</h2>
        </div>
      </div>
    </div>
  );
};

export default App;
