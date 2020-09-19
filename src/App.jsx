import React from "react";
import { Card, Status, GeoPath, GlobalAverageTemp } from "./components";
import "./App.scss";

const App = () => {
  return (
    <div className="app-container">
      <div className="app-top">
        <Status title="위치" value="서울" subValue="구로구 구로동"></Status>
        <Status title="온도" value="30" subValue="32"></Status>
        <Status title="강수확률" value="20"></Status>
        <Status title="습도" value="80"></Status>
        <Status title="미세먼지" value="30"></Status>
      </div>
      <div className="app-bottom">
        <div className="app-left">
          <div className="geo-section">
            <Card title="전국">
              <GeoPath />
            </Card>
          </div>
          <div className="global-section">
            <Card title="평균 기온">
              <GlobalAverageTemp />
            </Card>
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

export default App;
