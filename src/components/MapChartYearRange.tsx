import React, { FC, useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import { useStores } from "src/hooks";
import "./MapChartYearRange.scss";

const useStoreData = () => {
  const {
    store: { climateStore },
  } = useStores();

  return useObserver(() => ({
    selectYear: climateStore.selectYear,
    yearList: climateStore.yearList,
    targetYear: climateStore.targetYear,
  }));
};

export const MapChartYearRange: FC = () => {
  const { selectYear, yearList, targetYear } = useStoreData();
  const [isYearChanged, setIsYearChanged] = useState<boolean>(false);

  useEffect(() => {
    if (!yearList || isYearChanged) return;

    const timeouts: NodeJS.Timeout[] = [];

    for (let i = 1; i < yearList.length; i++) {
      const timer = setTimeout(() => {
        selectYear(yearList[i]);
      }, i * 1000);

      timeouts.push(timer);
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [yearList, isYearChanged, selectYear]);

  const handleChangeYearRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsYearChanged(true);

    const year = e.target.value;
    selectYear(Number(year));
  };

  return (
    <div className="map-chart-year-range-container">
      <div className="map-chart-year-text">{targetYear}</div>
      {yearList && targetYear && (
        <input
          className="map-chart-year-input"
          type="range"
          min={yearList[0]}
          max={yearList[yearList.length - 1]}
          value={targetYear}
          onChange={handleChangeYearRange}
        />
      )}
    </div>
  );
};
