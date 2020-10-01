import React, { FC, useEffect } from "react";
import { useObserver } from "mobx-react";
import { useStores } from "src/hooks";
import { Status } from "src/components/base";
import "./CurrentWeather.scss";

import { ReactComponent as Up } from "src/images/up.svg";
import { ReactComponent as Down } from "src/images/down.svg";
import { ReactComponent as Smiling } from "src/images/smiling.svg";
import { ReactComponent as Smile } from "src/images/smile.svg";
import { ReactComponent as Sad } from "src/images/sad.svg";
import { ReactComponent as Angry } from "src/images/angry.svg";

const createTempSubValue = (
  temp?: number,
  yesterday_temp?: number | null
): { value: string | null; icon?: string | JSX.Element } => {
  if (
    temp === undefined ||
    yesterday_temp === null ||
    yesterday_temp === undefined
  )
    return { value: null };

  const diff = temp - yesterday_temp;
  const value = `${Math.abs(Number(diff.toFixed(1)))} °C`;
  let icon: string | JSX.Element;

  if (diff < 0) {
    icon = <Down />;
  } else if (diff > 0) {
    icon = <Up />;
  } else {
    icon = "-";
  }

  return { value, icon };
};

const createAirSubValue = (
  air?: string | null
): { value: string | null; icon?: JSX.Element } => {
  if (!air) return { value: null };

  const numAir = Number(air);
  let value: string;
  let icon: JSX.Element;

  if (numAir <= 15) {
    value = "좋음";
    icon = <Smiling />;
  } else if (numAir <= 35) {
    value = "보통";
    icon = <Smile />;
  } else if (numAir <= 75) {
    value = "나쁨";
    icon = <Sad />;
  } else {
    value = "매우나쁨";
    icon = <Angry />;
  }

  return { value, icon };
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
  const { value: tempValue, icon: tempIcon } = createTempSubValue(
    t1h,
    yesterday_temp
  );
  const rainProb = pop !== null && pop !== undefined ? String(pop) : null;
  const humidity = reh !== null && reh !== undefined ? String(reh) : null;
  const { value: pm10Value, icon: pm10Icon } = createAirSubValue(pm10);
  const { value: pm25Value, icon: pm25Icon } = createAirSubValue(pm25);

  return (
    <div className="header-container">
      <Status title="위치" value={city} subValue={subLocation}></Status>
      <Status
        title="온도"
        value={t1h}
        subValue={tempValue}
        subValueIcon={tempIcon}
        unit="°C"
      ></Status>
      <Status title="강수확률" value={rainProb} unit="%"></Status>
      <Status title="습도" value={humidity} unit="%"></Status>
      <Status
        title="PM10"
        value={pm10}
        subValue={pm10Value}
        subValueIcon={pm10Icon}
        unit="㎛"
      ></Status>
      <Status
        title="PM25"
        value={pm25}
        subValue={pm25Value}
        subValueIcon={pm25Icon}
        unit="㎛"
      ></Status>
    </div>
  );
};
