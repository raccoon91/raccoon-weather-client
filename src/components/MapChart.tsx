import React, { FC, useRef, useEffect } from "react";
import { toJS } from "mobx";
import { useObserver } from "mobx-react";
import { useStores, useResizeObserver } from "src/hooks";
import { Card, MapChartCategory } from "src/components";
import { GeoPath, Legend } from "src/components/chart";
import "./MapChart.scss";

const climateCategory: {
  [key: string]: { domain: number[]; range: string[] };
} = {
  temp: {
    domain: [10, 12, 14, 16, 18, 20],
    range: ["#ffffff", "#edf8e9", "#bae4b3", "#74c476", "#31a354", "#006d2c"],
  },
  rn1: {
    domain: [0, 50, 100, 150, 200, 250],
    range: ["#ffffff", "#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"],
  },
  reh: {
    domain: [0, 20, 40, 60, 80, 100],
    range: ["#ffffff", "#f7f7f7", "#cccccc", "#969696", "#636363", "#252525"],
  },
};

const useStoreData = () => {
  const {
    store: { climateStore },
  } = useStores();

  return useObserver(() => ({
    getGeoJson: climateStore.getGeoJson,
    getGeoClimateData: climateStore.getGeoClimateData,
    selectGeoCountry: climateStore.selectGeoCountry,
    selectCategory: climateStore.selectCategory,
    geoJson: toJS(climateStore.geoJson),
    selectedCity: climateStore.selectedCity,
    selectedCountry: toJS(climateStore.selectedCountry),
    selectedCategory: climateStore.selectedCategory,
    geoClimateData: climateStore.geoClimateData,
  }));
};

export const MapChart: FC = () => {
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  const {
    getGeoJson,
    getGeoClimateData,
    selectGeoCountry,
    selectCategory,
    geoJson,
    selectedCity,
    selectedCountry,
    selectedCategory,
    geoClimateData,
  } = useStoreData();

  const width = dimensions?.width || 0;
  const height = dimensions?.height || 0;

  useEffect(() => {
    getGeoClimateData();
    getGeoJson();
  }, [getGeoJson, getGeoClimateData]);

  const { domain, range } = climateCategory[selectedCategory];

  console.log(selectedCity);

  return (
    <Card
      title={selectedCity || "전국"}
      option={
        <MapChartCategory
          selectCategory={selectCategory}
          selectedCategory={selectedCategory}
        />
      }
    >
      <div ref={wrapperRef} className="map-chart-container">
        <svg width={width} height={height}>
          <GeoPath
            width={width}
            height={height}
            geoJson={geoJson}
            geoClimateData={geoClimateData}
            selectGeoCountry={selectGeoCountry}
            selectedCountry={selectedCountry}
            selectedCategory={selectedCategory}
            colorDomain={domain}
            colorRange={range}
          />
          <Legend colorDomain={domain} colorRange={range} />
        </svg>
      </div>
    </Card>
  );
};
