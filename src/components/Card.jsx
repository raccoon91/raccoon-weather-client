import React from "react";
import "./Card.scss";

export const Card = ({ title, children }) => {
  return (
    <div className="card-container">
      <div className="card-title-wrapper">
        <h2 className="card-title">{title}</h2>
      </div>
      {children || null}
    </div>
  );
};
