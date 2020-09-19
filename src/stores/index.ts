import axios, { AxiosResponse } from "axios";
import publicIp from "public-ip";
import { observable, action } from "mobx";
import { json } from "d3";

interface ICurrentWeatherResponseData {
  weather: {
    city: string;
    t1h: number;
    yesterday_temp: number | null;
    pop: number;
    pty: number;
    reh: number;
    rn1: number;
    sky: number;
    pm10: string | null;
    pm25: string | null;
    weather_date: string;
  };
  location: {
    city: string;
    r1: string;
    r2: string;
    r3: string;
  };
}

export interface ICurrentWeather {
  city?: string;
  r2?: string;
  r3?: string;
  t1h?: number;
  yesterday_temp?: number | null;
  pop?: number;
  reh?: number;
  pm10?: string | null;
  pm25?: string | null;
}

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

export interface IGeoJson {
  type: string;
  bbox: number[];
  features: IGeoFeature[];
}

export interface IClimate {
  city: string;
  max_temp: number | null;
  min_temp: number | null;
  reh: number | null;
  rn1: number | null;
  temp: number | null;
  weather_date: string;
}

export class WeatherStore {
  @observable currentWeather: ICurrentWeather = {};
  @observable geoJson: IGeoJson | null = null;
  @observable selectedCountry: IGeoFeature | null = null;
  @observable climate: { [key: string]: IClimate } | null = null;

  @action getCurrentWeather = async () => {
    const ip = await publicIp.v4();
    const response: AxiosResponse<ICurrentWeatherResponseData> = await axios({
      url: "http://localhost:4000/current",
      method: "get",
      headers: {
        "x-client-ip": ip,
      },
    });

    const { weather, location } = response.data;
    const { t1h, yesterday_temp, pop, reh, pm10, pm25 } = weather;
    const { city, r2, r3 } = location;

    this.currentWeather = {
      city,
      r2,
      r3,
      t1h,
      yesterday_temp,
      pop,
      reh,
      pm10,
      pm25,
    };
  };

  @action getGeoJson = async () => {
    const response = await json<IGeoJson>("./GeoChart.korea.geo.json");

    this.geoJson = response;
  };

  @action getClimate = async (city?: string) => {
    const response: AxiosResponse<{ [key: string]: IClimate }> = await axios({
      url: "http://localhost:4000/climate/geo",
      method: "get",
    });

    this.climate = response.data;
  };

  @action selectGeoCountry = (feature: IGeoFeature) => {
    if (
      this.selectedCountry?.properties.CTP_KOR_NM ===
      feature.properties.CTP_KOR_NM
    ) {
      this.selectedCountry = null;
    } else {
      this.selectedCountry = feature;
    }
  };
}
