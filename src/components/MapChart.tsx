import React, { FC, useRef, useEffect } from "react";
import { toJS } from "mobx";
import { useObserver } from "mobx-react";
import { useStores, useResizeObserver } from "src/hooks";
import { Card, MapChartCategory, MapChartYearRange } from "src/components";
import { GeoPath, Legend } from "src/components/chart";
import "./MapChart.scss";

const useStoreData = () => {
  const {
    store: { climateStore },
  } = useStores();

  return useObserver(() => ({
    getGeoJson: climateStore.getGeoJson,
    getGeoClimateData: climateStore.getGeoClimateData,
    selectGeoCountry: climateStore.selectGeoCountry,
    geoJson: toJS(climateStore.geoJson),
    selectedCity: climateStore.selectedCity,
    selectedCountry: toJS(climateStore.selectedCountry),
    selectedCategory: climateStore.selectedCategory,
    climateOption: climateStore.climateOption,
    selectedGeoClimateData: climateStore.selectedGeoClimateData,
  }));
};

export const MapChart: FC = () => {
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  const {
    getGeoJson,
    getGeoClimateData,
    selectGeoCountry,
    geoJson,
    selectedCity,
    selectedCountry,
    selectedCategory,
    climateOption,
    selectedGeoClimateData,
  } = useStoreData();

  const width = dimensions?.width || 0;
  const height = dimensions?.height || 0;

  useEffect(() => {
    getGeoClimateData();
    getGeoJson();
  }, [getGeoJson, getGeoClimateData]);

  const { domain, range, unit } = climateOption;

  return (
    <Card title={selectedCity || "전국"} option={<MapChartCategory />}>
      <div ref={wrapperRef} className="map-chart-container">
        <svg width={width} height={height}>
          <GeoPath
            width={width}
            height={height}
            geoJson={geoJson}
            geoClimateData={selectedGeoClimateData}
            selectGeoCountry={selectGeoCountry}
            selectedCountry={selectedCountry}
            selectedCategory={selectedCategory}
            colorDomain={domain}
            colorRange={range}
          />
          <Legend colorDomain={domain} colorRange={range} unit={unit} />
        </svg>
        <MapChartYearRange />
      </div>
    </Card>
  );
};
