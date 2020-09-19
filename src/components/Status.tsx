import React, { FC } from "react";
import "./Status.scss";

interface IStatusProps {
  title: string;
  value: string;
  subValue?: string;
}

export const Status: FC<IStatusProps> = ({ title, value, subValue }) => {
  return (
    <div className="status-container">
      <h3 className="status-title">{title}</h3>
      <div className="status-content">{value}</div>
      {subValue ? <div>{subValue}</div> : null}
    </div>
  );
};
