import { AxiosResponse } from "axios";
import { observable, action, runInAction, computed } from "mobx";
import { json } from "d3";
import { requestWeatherApi } from "src/lib";
import { cityToAbbreviation } from "src/utils";

const climateCategory: {
  [key: string]: { domain: number[]; range: string[]; unit: string };
} = {
  temp: {
    domain: [12, 17],
    range: ["#edf8e9", "#bae4b3", "#74c476", "#31a354", "#006d2c"],
    unit: "°C",
  },
  rn1: {
    domain: [0, 250],
    range: ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"],
    unit: "mm",
  },
  reh: {
    domain: [40, 90],
    range: ["#f7f7f7", "#cccccc", "#969696", "#636363", "#252525"],
    unit: "%",
  },
};

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

  @observable yearList: number[] | null = null;
  @observable targetYearIndex: number = 0;
  @observable geoClimateData: {
    [key: string]: { [key: string]: IClimate };
  } | null = null;

  @observable tempDataList: IChartData[] = [];
  @observable rainDataList: IChartData[] = [];
  @observable humidDataList: IChartData[] = [];

  @computed get climateOption(): {
    domain: number[];
    range: string[];
    unit: string;
  } {
    return climateCategory[this.selectedCategory];
  }

  @computed get selectedGeoClimateData(): { [key: string]: IClimate } | null {
    if (!this.yearList || !this.geoClimateData) return null;

    return this.geoClimateData[this.yearList[this.targetYearIndex]];
  }

  @action getGeoJson = async () => {
    try {
      const response = await json<IGeoJson>("./GeoChart.korea.geo.json");

      if (!response) return;

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
        yearList: number[];
        geoClimateData: { [key: string]: { [key: string]: IClimate } };
      }> = await requestWeatherApi({
        method: "get",
        url: "climate/geo",
      });

      const { yearList, geoClimateData } = response.data;

      if (!yearList || !geoClimateData) return;

      runInAction(() => {
        this.yearList = yearList;
        this.geoClimateData = geoClimateData;
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

      if (!response) return;

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

  @action selectYearIndex = (index: number) => {
    if (index !== this.targetYearIndex) {
      this.targetYearIndex = index;
    }
  };

  @action selectCategory = (category?: string) => {
    if (!category) return;

    if (this.selectedCategory !== category) {
      this.selectedCategory = category;
    }
  };
}
