import React from "react";
import { Card, Header, GeoPath, GlobalAverageTemp } from "src/components";
import "./App.scss";

export const App = () => {
  return (
    <div className="app-container">
      <div className="app-top">
        <Header />
      </div>

      <div className="app-bottom">
        <div className="app-left">
          <div className="geo-section">
            <GeoPath />
          </div>
          <div className="global-section">
            <GlobalAverageTemp />
          </div>
        </div>

        <div className="app-right">
          <div className="climate-section">
            <Card title="기온"></Card>
          </div>
          <div className="climate-section">
            <Card title="강수량"></Card>
          </div>
          <div className="climate-section">
            <Card title="습도"></Card>
          </div>
        </div>
      </div>
    </div>
  );
};
