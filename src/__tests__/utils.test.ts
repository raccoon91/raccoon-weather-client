import { formatDate, getHour } from "utils/date";
import { remToPixel } from "utils/style";
import { convertCityName, getFeelTemp, getWeatherType, windDirectionName } from "utils/weather";

describe("utils", () => {
  describe("date", () => {
    test("formatDate", () => {
      expect(formatDate(new Date("2022-01-01 00:00"))).toEqual("01-01 00:00");
    });

    test("getHour", () => {
      expect(getHour(new Date("2022-01-01 00:00"))).toEqual(0);
    });
  });

  describe("style", () => {
    test("remToPixel", () => {
      document.documentElement.style.fontSize = "9px";

      expect(remToPixel(1)).toEqual(9);

      document.documentElement.style.fontSize = "10px";

      expect(remToPixel(1)).toEqual(10);
    });
  });

  describe("weather", () => {
    test("convertCityName", () => {
      expect(convertCityName("seoul")).toEqual("서울");
      expect(convertCityName("gangwon")).toEqual("강원");
      expect(convertCityName("gyeonggi")).toEqual("경기");
      expect(convertCityName("gyeongnam")).toEqual("경남");
      expect(convertCityName("gyeongbuk")).toEqual("경북");
      expect(convertCityName("gwangju")).toEqual("광주");
      expect(convertCityName("daegu")).toEqual("대구");
      expect(convertCityName("daejeon")).toEqual("대전");
      expect(convertCityName("busan")).toEqual("부산");
      expect(convertCityName("sejong")).toEqual("세종");
      expect(convertCityName("ulsan")).toEqual("울산");
      expect(convertCityName("incheon")).toEqual("인천");
      expect(convertCityName("jeonnam")).toEqual("전남");
      expect(convertCityName("jeonbuk")).toEqual("전북");
      expect(convertCityName("jeju")).toEqual("제주");
      expect(convertCityName("chungnam")).toEqual("충남");
      expect(convertCityName("chungbuk")).toEqual("충북");
    });

    test("getFeelTemp", () => {
      expect(getFeelTemp(5.1, 12.2)).toEqual(2.3);
      expect(getFeelTemp(1.5, 8.3)).toEqual(-1.1);
      expect(getFeelTemp(3.5, 9.7)).toEqual(0.9);
      expect(getFeelTemp(6.1, 11.5)).toEqual(3.7);
      expect(getFeelTemp(8.7, 17.3)).toEqual(6);
      expect(getFeelTemp(4.6, 11.2)).toEqual(1.9);
      expect(getFeelTemp(4.0, 9.4)).toEqual(1.6);
      expect(getFeelTemp(3.6, 5.4)).toEqual(2.3);
      expect(getFeelTemp(5.7, 9.7)).toEqual(3.6);
      expect(getFeelTemp(5.6, 9)).toEqual(3.6);
      expect(getFeelTemp(8.0, 9)).toEqual(6.4);
      expect(getFeelTemp(8.4, 15.1)).toEqual(5.9);
      expect(getFeelTemp(5.1, 11.2)).toEqual(2.5);
      expect(getFeelTemp(7.8, 12.2)).toEqual(5.6);
      expect(getFeelTemp(7.3, 10.1)).toEqual(5.4);
      expect(getFeelTemp(7.6, 9.4)).toEqual(5.9);
      expect(getFeelTemp(8.9, 7.9)).toEqual(7.7);
      expect(getFeelTemp(9.9, 5.4)).toEqual(9.5);
      expect(getFeelTemp(9.8, 9.4)).toEqual(8.5);
    });

    test("getWeatherType", () => {
      const day = "2022-01-01 12:00";
      const night = "2022-01-01 24:00";

      expect(getWeatherType(1, 0, day)).toEqual("day");
      expect(getWeatherType(1, 0, night)).toEqual("night");
      expect(getWeatherType(2, 0, day)).toEqual("cloud");
      expect(getWeatherType(2, 0, night)).toEqual("cloud");
      expect(getWeatherType(3, 0, day)).toEqual("cloudDay");
      expect(getWeatherType(3, 0, night)).toEqual("cloudNight");
      expect(getWeatherType(4, 0, day)).toEqual("cloud");
      expect(getWeatherType(4, 0, night)).toEqual("cloud");

      expect(getWeatherType(1, 1, day)).toEqual("rainyDay");
      expect(getWeatherType(1, 1, night)).toEqual("rainyNight");
      expect(getWeatherType(2, 1, day)).toEqual("rainyDay");
      expect(getWeatherType(2, 1, night)).toEqual("rainyNight");
      expect(getWeatherType(3, 1, day)).toEqual("rainyDay");
      expect(getWeatherType(3, 1, night)).toEqual("rainyNight");
      expect(getWeatherType(4, 1, day)).toEqual("rainyDay");
      expect(getWeatherType(4, 1, night)).toEqual("rainyNight");

      expect(getWeatherType(1, 2, day)).toEqual("snowyDay");
      expect(getWeatherType(2, 2, day)).toEqual("snowyDay");
      expect(getWeatherType(3, 2, day)).toEqual("snowyDay");
      expect(getWeatherType(4, 2, day)).toEqual("snowyDay");
      expect(getWeatherType(1, 2, night)).toEqual("snowyNight");
      expect(getWeatherType(2, 2, night)).toEqual("snowyNight");
      expect(getWeatherType(3, 2, night)).toEqual("snowyNight");
      expect(getWeatherType(4, 2, night)).toEqual("snowyNight");

      expect(getWeatherType(1, 3, day)).toEqual("snowyDay");
      expect(getWeatherType(2, 3, day)).toEqual("snowyDay");
      expect(getWeatherType(3, 3, day)).toEqual("snowyDay");
      expect(getWeatherType(4, 3, day)).toEqual("snowyDay");
      expect(getWeatherType(1, 3, night)).toEqual("snowyNight");
      expect(getWeatherType(2, 3, night)).toEqual("snowyNight");
      expect(getWeatherType(3, 3, night)).toEqual("snowyNight");
      expect(getWeatherType(4, 3, night)).toEqual("snowyNight");

      expect(getWeatherType(1, 7, day)).toEqual("snowyDay");
      expect(getWeatherType(2, 7, day)).toEqual("snowyDay");
      expect(getWeatherType(3, 7, day)).toEqual("snowyDay");
      expect(getWeatherType(4, 7, day)).toEqual("snowyDay");
      expect(getWeatherType(1, 7, night)).toEqual("snowyNight");
      expect(getWeatherType(2, 7, night)).toEqual("snowyNight");
      expect(getWeatherType(3, 7, night)).toEqual("snowyNight");
      expect(getWeatherType(4, 7, night)).toEqual("snowyNight");

      expect(getWeatherType(1, 4, day)).toEqual("rainyDrop");
      expect(getWeatherType(2, 4, day)).toEqual("rainyDrop");
      expect(getWeatherType(3, 4, day)).toEqual("rainyDrop");
      expect(getWeatherType(4, 4, day)).toEqual("rainyDrop");
      expect(getWeatherType(1, 4, night)).toEqual("rainyDrop");
      expect(getWeatherType(2, 4, night)).toEqual("rainyDrop");
      expect(getWeatherType(3, 4, night)).toEqual("rainyDrop");
      expect(getWeatherType(4, 4, night)).toEqual("rainyDrop");

      expect(getWeatherType(1, 5, day)).toEqual("rainyDrop");
      expect(getWeatherType(2, 5, day)).toEqual("rainyDrop");
      expect(getWeatherType(3, 5, day)).toEqual("rainyDrop");
      expect(getWeatherType(4, 5, day)).toEqual("rainyDrop");
      expect(getWeatherType(1, 5, night)).toEqual("rainyDrop");
      expect(getWeatherType(2, 5, night)).toEqual("rainyDrop");
      expect(getWeatherType(3, 5, night)).toEqual("rainyDrop");
      expect(getWeatherType(4, 5, night)).toEqual("rainyDrop");

      expect(getWeatherType(1, 6, day)).toEqual("rainyDrop");
      expect(getWeatherType(2, 6, day)).toEqual("rainyDrop");
      expect(getWeatherType(3, 6, day)).toEqual("rainyDrop");
      expect(getWeatherType(4, 6, day)).toEqual("rainyDrop");
      expect(getWeatherType(1, 6, night)).toEqual("rainyDrop");
      expect(getWeatherType(2, 6, night)).toEqual("rainyDrop");
      expect(getWeatherType(3, 6, night)).toEqual("rainyDrop");
      expect(getWeatherType(4, 6, night)).toEqual("rainyDrop");

      expect(getWeatherType(1, 8, day)).toEqual("cloud");
      expect(getWeatherType(2, 8, day)).toEqual("cloud");
      expect(getWeatherType(3, 8, day)).toEqual("cloud");
      expect(getWeatherType(4, 8, day)).toEqual("cloud");
      expect(getWeatherType(1, 8, night)).toEqual("cloud");
      expect(getWeatherType(2, 8, night)).toEqual("cloud");
      expect(getWeatherType(3, 8, night)).toEqual("cloud");
      expect(getWeatherType(4, 8, night)).toEqual("cloud");

      expect(getWeatherType()).toEqual(null);
    });

    test("windDirectionName", () => {
      expect(windDirectionName(0)).toEqual("북풍");
      expect(windDirectionName(22.5)).toEqual("북북동풍");
      expect(windDirectionName(45)).toEqual("북동풍");
      expect(windDirectionName(67.5)).toEqual("동북동풍");
      expect(windDirectionName(90)).toEqual("동풍");
      expect(windDirectionName(112.5)).toEqual("동남동풍");
      expect(windDirectionName(135)).toEqual("남동풍");
      expect(windDirectionName(157.5)).toEqual("남남동풍");
      expect(windDirectionName(180)).toEqual("남풍");
      expect(windDirectionName(202.5)).toEqual("남남서풍");
      expect(windDirectionName(225)).toEqual("남서풍");
      expect(windDirectionName(247.5)).toEqual("서남서풍");
      expect(windDirectionName(270)).toEqual("서풍");
      expect(windDirectionName(292.5)).toEqual("서북서풍");
      expect(windDirectionName(315)).toEqual("북서풍");
      expect(windDirectionName(337.5)).toEqual("북북서풍");
      expect(windDirectionName(360)).toEqual("북풍");
    });
  });
});
