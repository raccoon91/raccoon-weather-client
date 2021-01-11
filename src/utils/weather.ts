import { IWeather, IWeatherData } from "src/stores/WeatherStore";

export const createTempSubValue = (
  temp: number | null,
  yesterday_temp: number | null,
): { tempValue: string | null; tempIcon: string | null } => {
  if (temp === null || yesterday_temp === null) return { tempValue: null, tempIcon: null };

  const diff = temp - yesterday_temp;
  const tempValue = `${Math.abs(Number(diff.toFixed(1)))} °C`;
  let tempIcon: string | null = null;

  if (diff < 0) {
    tempIcon = "temp-down";
  } else if (diff > 0) {
    tempIcon = "temp-up";
  }

  return { tempValue, tempIcon };
};

export const createAirSubValue = (air: string | null): { airValue: string | null; airIcon: string | null } => {
  if (!air) return { airValue: null, airIcon: null };

  const numAir = Number(air);
  let airValue: string;
  let airIcon: string | null;

  if (numAir <= 15) {
    airValue = "좋음";
    airIcon = "air-smiling";
  } else if (numAir <= 35) {
    airValue = "보통";
    airIcon = "air-smile";
  } else if (numAir <= 75) {
    airValue = "나쁨";
    airIcon = "air-sad";
  } else if (numAir > 75) {
    airValue = "매우나쁨";
    airIcon = "air-angry";
  } else {
    airValue = "-";
    airIcon = null;
  }

  return { airValue, airIcon };
};

export const formatWeatherData = (currentWeather: IWeather): { [key: string]: IWeatherData } => {
  const { city, r2, r3, t1h, yesterday_temp, pop, reh, pm10, pm25 } = currentWeather;

  const subLocation = r2 && r3 ? `${r2} ${r3}` : "-";
  const { tempValue, tempIcon } = createTempSubValue(t1h, yesterday_temp);
  const rainProb = pop !== null ? String(pop) : null;
  const humidity = reh !== null ? String(reh) : null;
  const { airValue: pm10Value, airIcon: pm10Icon } = createAirSubValue(pm10);
  const { airValue: pm25Value, airIcon: pm25Icon } = createAirSubValue(pm25);

  return {
    위치: {
      title: "위치",
      value: city,
      subValue: subLocation,
    },
    온도: {
      title: "온도",
      value: t1h,
      unit: "°C",
      subValue: tempValue,
      subIcon: tempIcon,
    },
    강수확률: {
      title: "강수확률",
      value: rainProb,
      unit: "%",
    },
    습도: {
      title: "습도",
      value: humidity,
      unit: "%",
    },
    PM10: {
      title: "PM10",
      value: pm10,
      unit: "°C",
      subValue: pm10Value,
      subIcon: pm10Icon,
    },
    PM25: {
      title: "PM25",
      value: pm25,
      unit: "°C",
      subValue: pm25Value,
      subIcon: pm25Icon,
    },
  };
};
