import React from "react";
import "./Status.scss";

export const Status = ({ title, value, subValue }) => {
  return (
    <div className="status-container">
      <h3 className="status-title">{title}</h3>
      <div className="status-content">{value}</div>
      {subValue ? <div>{subValue}</div> : null}
    </div>
  );
};
