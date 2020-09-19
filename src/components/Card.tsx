import React, { FC } from "react";
import "./Card.scss";

interface ICardProps {
  title: string;
  children?: JSX.Element;
}

export const Card: FC<ICardProps> = ({ title, children }) => {
  return (
    <div className="card-container">
      <div className="card-title-wrapper">
        <h2 className="card-title">{title}</h2>
      </div>
      {children || null}
    </div>
  );
};
