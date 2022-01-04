import { getHour } from "utils";

export const getFeelTemp = (temp: number, wind: number) => {
  const windCalib = Math.pow(wind, 0.16);

  return Number((13.12 + 0.6215 * temp - 11.37 * windCalib + 0.3965 * windCalib * temp).toFixed(1));
};

export const getWeatherType = (sky: number, rainType: number, date?: string) => {
  const hour = getHour(date);

  if (rainType === 0) {
    if (sky === 1) {
      if (hour > 6 && hour <= 18) {
        return "day";
      } else {
        return "night";
      }
    } else if (sky === 3) {
      if (hour > 6 && hour <= 18) {
        return "cloudDay";
      } else {
        return "cloudNight";
      }
    } else {
      return "cloud";
    }
  } else if (rainType === 1) {
    if (hour > 6 && hour <= 18) {
      return "rainyDay";
    } else {
      return "rainyNight";
    }
  } else if (rainType === 2 || rainType === 3 || rainType === 7) {
    if (hour > 6 && hour <= 18) {
      return "snowyDay";
    } else {
      return "snowyNight";
    }
  } else if (rainType === 4 || rainType === 5 || rainType === 6) {
    return "rainDrop";
  } else {
    return "cloude";
  }
};
