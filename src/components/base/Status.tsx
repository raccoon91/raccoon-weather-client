import React, { FC } from "react";
import "./Status.scss";

interface IStatusProps {
  title: string;
  value: number | string | null;
  unit?: string;
  subValue?: string | null;
  subIcon?: string | JSX.Element | null;
}

export const Status: FC<IStatusProps> = ({
  title,
  value,
  unit,
  subValue,
  subIcon,
}) => {
  return (
    <div className="status-container">
      <h3 className="status-title">{title}</h3>
      <div className="status-content">
        <span className="status-content-value">{value || "-"}</span>
        {value && unit && <span className="status-content-unit">{unit}</span>}
      </div>
      {subValue ? (
        <div className="status-content-sub-value">
          {subIcon && subIcon}
          {subValue}
        </div>
      ) : null}
    </div>
  );
};
