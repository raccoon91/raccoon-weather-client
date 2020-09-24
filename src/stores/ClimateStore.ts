import { AxiosResponse } from "axios";
import { observable, action, runInAction } from "mobx";
import { json } from "d3";
import { requestWeatherApi } from "src/lib";
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

interface IChartData {
  value: number;
  x: number;
}

export class ClimateStore {
  @observable geoJson: IGeoJson | null = null;
  @observable selectedCity: string | null = null;
  @observable selectedCountry: IGeoFeature | null = null;
  @observable selectedCategory: string = "rn1";

  @observable geoClimateData: { [key: string]: IClimate } | null = null;

  @observable tempDataList: IChartData[] | null = null;
  @observable rainDataList: IChartData[] | null = null;
  @observable humidDataList: IChartData[] | null = null;

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
      const response: AxiosResponse<{
        [key: string]: IClimate;
      }> = await requestWeatherApi({
        method: "get",
        url: "climate/geo",
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
      }> = await requestWeatherApi({
        method: "get",
        url: `climate/local/${city}`,
      });

      const climateData = response.data;
      const yearList = Object.keys(climateData);

      const tempDataList: IChartData[] = [];
      const rainDataList: IChartData[] = [];
      const humidDataList: IChartData[] = [];

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

        const tempData = Number((stack.temp / stack.count).toFixed(1));
        const rainData = Number((stack.rn1 / stack.count).toFixed(1));
        const humidData = Number((stack.reh / stack.count).toFixed(1));

        tempDataList.push({ value: tempData, x: Number(year) });
        rainDataList.push({ value: rainData, x: Number(year) });
        humidDataList.push({ value: humidData, x: Number(year) });
      });

      runInAction(() => {
        this.tempDataList = tempDataList;
        this.rainDataList = rainDataList;
        this.humidDataList = humidDataList;
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
