import { AxiosResponse } from "axios";
import { observable, action, runInAction } from "mobx";
import publicIp from "public-ip";
import { csv, DSVRowArray } from "d3";
import { requestWeatherApi } from "src/lib";

const { REACT_APP_GLOBAL_TEMPERATURE_URL } = process.env;

interface IWeatherResponseData {
  city: string;
  t1h: number;
  yesterday_temp: number | null;
  pop: number | null;
  reh: number;
  rn1: number;
  pm10: string | null;
  pm25: string | null;
  weather_date: string;
}

interface ILocationResponseData {
  city: string;
  r1: string;
  r2: string;
  r3: string;
}

interface ICurrentWeatherResponseData {
  weather: IWeatherResponseData;
  location: ILocationResponseData;
}

interface ICurrentWeather {
  city: string | null;
  r2: string | null;
  r3: string | null;
  t1h: number | null;
  yesterday_temp: number | null;
  pop: number | null;
  reh: number | null;
  pm10: string | null;
  pm25: string | null;
}

interface IGlobalTempData {
  value: number;
  x: number;
}

export class WeatherStore {
  @observable currentWeather: ICurrentWeather = {
    city: null,
    r2: null,
    r3: null,
    t1h: null,
    yesterday_temp: null,
    pop: null,
    reh: null,
    pm10: null,
    pm25: null,
  };

  @observable globalTempChartDataList: IGlobalTempData[] = [];

  @action
  getCurrentWeather = async () => {
    try {
      const ip = await publicIp.v4();

      const response: AxiosResponse<ICurrentWeatherResponseData> = await requestWeatherApi(
        {
          method: "get",
          url: "weather",
          headers: {
            "x-client-ip": ip,
          },
        }
      );

      const { weather, location } = response.data;

      if (!weather || !location) return;

      const { t1h, yesterday_temp, pop, reh, pm10, pm25 } = weather;
      const { city, r2, r3 } = location;

      runInAction(() => {
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
      });
    } catch (err) {
      console.error("current weather request failed");
    }
  };

  @action
  getGlobalTemperature = async () => {
    try {
      const response: DSVRowArray = await csv(
        REACT_APP_GLOBAL_TEMPERATURE_URL as string
      );

      const chartDataList: IGlobalTempData[] = [];

      response.forEach((data) => {
        const x = Number(data.YEAR);
        const value = Number(data.VALUE);

        chartDataList.push({ value, x });
      });

      runInAction(() => {
        this.globalTempChartDataList = chartDataList;
      });
    } catch (err) {
      console.error("global temperature request failed");
    }
  };
}
