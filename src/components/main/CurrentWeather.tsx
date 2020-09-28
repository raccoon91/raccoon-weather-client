import React, { FC, useEffect } from "react";
import { useObserver } from "mobx-react";
import { useStores } from "src/hooks";
import { Status } from "src/components/base";
import "./CurrentWeather.scss";

const createTempSubValue = (temp?: number, yesterday_temp?: number | null) => {
  if (
    temp === undefined ||
    yesterday_temp === null ||
    yesterday_temp === undefined
  )
    return null;

  const diff = temp - yesterday_temp;
  const value = Math.abs(Number(diff.toFixed(1)));

  if (diff < 0) {
    return `🔻 ${value} °C`;
  } else if (diff > 0) {
    return `🔺 ${value} °C`;
  } else {
    return `- °C`;
  }
};

const createAirSubValue = (air?: string | null): string | null => {
  if (!air) return null;

  const numAir = Number(air);

  if (numAir <= 15) {
    return "😄 좋음";
  } else if (numAir <= 35) {
    return "😊 보통";
  } else if (numAir <= 75) {
    return "🙁 나쁨";
  } else {
    return "😡 매우나쁨";
  }
};

const useStoreData = () => {
  const {
    store: { weatherStore },
  } = useStores();

  return useObserver(() => ({
    getCurrentWeather: weatherStore.getCurrentWeather,
    currentWeather: weatherStore.currentWeather,
  }));
};

export const CurrentWeather: FC = () => {
  const { getCurrentWeather, currentWeather } = useStoreData();

  useEffect(() => {
    getCurrentWeather();
  }, [getCurrentWeather]);

  const { city, r2, r3, t1h, yesterday_temp, pop, reh, pm10, pm25 } =
    currentWeather || {};

  const subLocation = r2 && r3 ? `${r2} ${r3}` : "-";
  const subTemp = createTempSubValue(t1h, yesterday_temp);
  const rainProb = pop !== null && pop !== undefined ? String(pop) : null;
  const humidity = reh !== null && reh !== undefined ? String(reh) : null;
  const subPm10 = createAirSubValue(pm10);
  const subPm25 = createAirSubValue(pm25);

  return (
    <div className="header-container">
      <Status title="위치" value={city} subValue={subLocation}></Status>
      <Status title="온도" value={t1h} subValue={subTemp} unit="°C"></Status>
      <Status title="강수확률" value={rainProb} unit="%"></Status>
      <Status title="습도" value={humidity} unit="%"></Status>
      <Status title="PM10" value={pm10} subValue={subPm10} unit="㎛"></Status>
      <Status title="PM25" value={pm25} subValue={subPm25} unit="㎛"></Status>
    </div>
  );
};
