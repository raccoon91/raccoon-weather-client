import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./NoMatch.scss";

export const NoMatch: FC = () => {
  return (
    <div className="no-match-container">
      <h2 className="no-match-text">Page Not Found</h2>
      <Link to="/">
        <div className="go-to-home">Home</div>
      </Link>
    </div>
  );
};
