import React, { FC } from "react";
import "./Card.scss";

interface ICardProps {
  title: string;
  option?: JSX.Element;
  children?: JSX.Element;
}

export const Card: FC<ICardProps> = ({ title, option, children }) => {
  return (
    <div className="card-container">
      <div className="card-title-wrapper">
        <h2 className="card-title">{title}</h2>
        {option}
      </div>
      {children || null}
    </div>
  );
};
