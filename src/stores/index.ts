import { WeatherStore } from "./WeatherStore";
import { ClimateStore } from "./ClimateStore";

export * from "./ClimateStore";
export class RootStore {
  weatherStore: WeatherStore;
  climateStore: ClimateStore;

  constructor() {
    this.weatherStore = new WeatherStore();
    this.climateStore = new ClimateStore();
  }
}
