import { getHour } from "utils";

const windDirectionDictionary: { [code: number]: string } = {
  0: "북풍",
  1: "북북동풍",
  2: "북동풍",
  3: "동북동풍",
  4: "동풍",
  5: "동남동풍",
  6: "남동풍",
  7: "남남동풍",
  8: "남풍",
  9: "남남서풍",
  10: "남서풍",
  11: "서남서풍",
  12: "서풍",
  13: "서북서풍",
  14: "북서풍",
  15: "북북서풍",
  16: "북풍",
};

const enCityNameDictionary: { [enName: string]: string } = {
  seoul: "서울",
  gangwon: "강원",
  gyeonggi: "경기",
  gyeongnam: "경남",
  gyeongbuk: "경북",
  gwangju: "광주",
  daegu: "대구",
  daejeon: "대전",
  busan: "부산",
  sejong: "세종",
  ulsan: "울산",
  incheon: "인천",
  jeonnam: "전남",
  jeonbuk: "전북",
  jeju: "제주",
  chungnam: "충남",
  chungbuk: "충북",
};

export const convertCityName = (cityName: string) => {
  return enCityNameDictionary[cityName];
};

export const getFeelTemp = (temp: number, wind: number) => {
  const windCalib = Math.pow(wind, 0.16);

  return Number((13.12 + 0.6215 * temp - 11.37 * windCalib + 0.3965 * windCalib * temp).toFixed(1));
};

export const getWeatherType = (sky?: number, rainType?: number, date?: string) => {
  if (sky === undefined || rainType === undefined || date === undefined) return null;

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
    return "rainyDrop";
  } else {
    return "cloud";
  }
};

export const windDirectionName = (windDirection: number) => {
  const windDirectionCode = Math.floor((windDirection + 22.5 * 0.5) / 22.5);

  return windDirectionDictionary[windDirectionCode];
};
