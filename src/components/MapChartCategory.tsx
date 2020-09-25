import React, { FC } from "react";
import "./MapChartCategory.scss";

interface IMapChartCategoryProps {
  selectCategory: (category?: string) => void;
  selectedCategory: string;
}

export const MapChartCategory: FC<IMapChartCategoryProps> = ({
  selectCategory,
  selectedCategory,
}) => {
  const handleSelectCategory = (e: React.SyntheticEvent<EventTarget>) => {
    const { target } = e;

    if (!(target instanceof HTMLSpanElement)) {
      return;
    }

    const { option } = target.dataset;

    selectCategory(option);
  };

  const createClassName = (option: string) => {
    if (option === selectedCategory) {
      return `chart-option ${option} selected`;
    } else {
      return `chart-option ${option}`;
    }
  };

  return (
    <div className="map-chart-option-container" onClick={handleSelectCategory}>
      <span className={createClassName("temp")} data-option="temp">
        온도
      </span>
      <span className={createClassName("rn1")} data-option="rn1">
        강수량
      </span>
      <span className={createClassName("reh")} data-option="reh">
        습도
      </span>
    </div>
  );
};
