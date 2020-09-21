import axios, { AxiosResponse } from "axios";
import { observable, action, runInAction } from "mobx";
import { json } from "d3";
import { cityToAbbreviation } from "src/utils";

interface IGeoFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: any[][];
  };
  properties: {
    CTPRVN_CD: string;
    CTP_ENG_NM: string;
    CTP_KOR_NM: string;
  };
}

interface IGeoJson {
  type: string;
  bbox: number[];
  features: IGeoFeature[];
}

interface IClimate {
  city: string;
  temp: number;
  max_temp: number;
  min_temp: number;
  reh: number;
  rn1: number;
  weather_date: string;
}

export class ClimateStore {
  @observable geoJson: IGeoJson | null = null;
  @observable selectedCity: string | null = null;
  @observable selectedCountry: IGeoFeature | null = null;
  @observable selectedCategory: string = "rn1";

  @observable geoClimateData: { [key: string]: IClimate } | null = null;

  @observable climateYearList: number[] | null = null;
  @observable climateTempList: number[] | null = null;
  @observable climateRainList: number[] | null = null;
  @observable climateHumidList: number[] | null = null;

  @action getGeoJson = async () => {
    try {
      const response = await json<IGeoJson>("./GeoChart.korea.geo.json");

      runInAction(() => {
        this.geoJson = response;
      });
    } catch (err) {
      console.error("geo json request failed");
    }
  };

  @action getGeoClimateData = async () => {
    try {
      const response: AxiosResponse<{ [key: string]: IClimate }> = await axios({
        url: "http://localhost:4000/climate/geo",
        method: "get",
      });

      runInAction(() => {
        this.geoClimateData = response.data;
      });
    } catch (err) {
      console.error("geo climate request failed");
    }
  };

  @action getLocalClimate = async () => {
    try {
      const city = this.selectedCity
        ? cityToAbbreviation[this.selectedCity]
        : "전국";

      const response: AxiosResponse<{
        [key: string]: IClimate[];
      }> = await axios({
        url: `http://localhost:4000/climate/local/${city}`,
        method: "get",
      });

      const climateData = response.data;
      const yearList = Object.keys(climateData);

      const climateYearList: number[] = [];
      const climateTempList: number[] = [];
      const climateRainList: number[] = [];
      const climateHumidList: number[] = [];

      yearList.forEach((year) => {
        const climateDataList = climateData[year];
        const stack = { temp: 0, rn1: 0, reh: 0, count: 0 };

        climateDataList.forEach((climateData) => {
          const { temp, rn1, reh } = climateData;

          stack.temp += temp;
          stack.rn1 += rn1;
          stack.reh += reh;
          stack.count += 1;
        });

        climateYearList.push(Number(year));
        climateTempList.push(Number((stack.temp / stack.count).toFixed(1)));
        climateRainList.push(Number((stack.rn1 / stack.count).toFixed(1)));
        climateHumidList.push(Number((stack.reh / stack.count).toFixed(1)));
      });

      runInAction(() => {
        this.climateYearList = climateYearList;
        this.climateTempList = climateTempList;
        this.climateRainList = climateRainList;
        this.climateHumidList = climateHumidList;
      });
    } catch (err) {
      console.error("local climate request failed");
    }
  };

  @action selectGeoCountry = async (feature: IGeoFeature) => {
    const city = feature.properties.CTP_KOR_NM;

    if (this.selectedCity === city) {
      this.selectedCity = null;
      this.selectedCountry = null;
    } else {
      this.selectedCity = city;
      this.selectedCountry = feature;
    }

    await this.getLocalClimate();
  };

  @action selectCategory = (category?: string) => {
    if (!category) return;

    if (this.selectedCategory !== category) {
      this.selectedCategory = category;
    }
  };
}
