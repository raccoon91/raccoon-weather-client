import React, { FC, useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import { useStores } from "src/hooks";
import "./MapChartYearRange.scss";

import { ReactComponent as Play } from "src/images/play.svg";
import { ReactComponent as Pause } from "src/images/pause.svg";

const useStoreData = () => {
  const {
    store: { climateStore },
  } = useStores();

  return useObserver(() => ({
    selectYearIndex: climateStore.selectYearIndex,
    yearList: climateStore.yearList,
    targetYearIndex: climateStore.targetYearIndex,
  }));
};

export const MapChartYearRange: FC = () => {
  const { selectYearIndex, yearList, targetYearIndex } = useStoreData();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentYearIndex, setCurrentIndex] = useState<number>(targetYearIndex);

  useEffect(() => {
    if (!yearList || isPaused) return;

    const timeouts: NodeJS.Timeout[] = [];

    for (let i = currentYearIndex; i < yearList.length; i++) {
      const timer = setTimeout(() => {
        selectYearIndex(i);

        if (i === yearList.length - 1) {
          setIsPaused((state) => !state);
        }
      }, (i - currentYearIndex) * 1000);

      timeouts.push(timer);
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [yearList, currentYearIndex, isPaused, selectYearIndex]);

  const handleChangeYearRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPaused(true);

    const yearIndex = e.target.value;
    selectYearIndex(Number(yearIndex));
  };

  const handleChangeIsPaused = () => {
    if (isPaused) {
      if (yearList && targetYearIndex === yearList.length - 1) {
        selectYearIndex(0);
        setCurrentIndex(0);
      } else {
        setCurrentIndex(targetYearIndex);
      }
    }

    setIsPaused((state) => !state);
  };

  return (
    <div className="map-chart-year-range-container">
      {yearList && (
        <div className="map-chart-year-text">{yearList[targetYearIndex]}</div>
      )}
      {yearList && (
        <input
          className="map-chart-year-range"
          type="range"
          min={0}
          max={yearList.length - 1}
          value={targetYearIndex}
          onChange={handleChangeYearRange}
        />
      )}
      {isPaused ? (
        <Play onClick={handleChangeIsPaused} />
      ) : (
        <Pause onClick={handleChangeIsPaused} />
      )}
    </div>
  );
};
