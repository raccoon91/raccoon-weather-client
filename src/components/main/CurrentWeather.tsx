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
  temp: number | null,
  yesterday_temp: number | null
): { tempValue: string | null; tempIcon: string | JSX.Element | null } => {
  if (temp === null || yesterday_temp === null)
    return { tempValue: null, tempIcon: null };

  const diff = temp - yesterday_temp;
  const tempValue = `${Math.abs(Number(diff.toFixed(1)))} °C`;
  let tempIcon: string | JSX.Element;

  if (diff < 0) {
    tempIcon = <Down />;
  } else if (diff > 0) {
    tempIcon = <Up />;
  } else {
    tempIcon = "-";
  }

  return { tempValue, tempIcon };
};

const createAirSubValue = (
  air: string | null
): { airValue: string | null; airIcon: JSX.Element | null } => {
  if (!air) return { airValue: null, airIcon: null };

  const numAir = Number(air);
  let airValue: string;
  let airIcon: JSX.Element | null;

  if (numAir <= 15) {
    airValue = "좋음";
    airIcon = <Smiling />;
  } else if (numAir <= 35) {
    airValue = "보통";
    airIcon = <Smile />;
  } else if (numAir <= 75) {
    airValue = "나쁨";
    airIcon = <Sad />;
  } else if (numAir > 75) {
    airValue = "매우나쁨";
    airIcon = <Angry />;
  } else {
    airValue = "-";
    airIcon = null;
  }

  return { airValue, airIcon };
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

  const {
    city,
    r2,
    r3,
    t1h,
    yesterday_temp,
    pop,
    reh,
    pm10,
    pm25,
  } = currentWeather;

  const subLocation = r2 && r3 ? `${r2} ${r3}` : "-";
  const { tempValue, tempIcon } = createTempSubValue(t1h, yesterday_temp);
  const rainProb = pop !== null ? String(pop) : null;
  const humidity = reh !== null ? String(reh) : null;
  const { airValue: pm10Value, airIcon: pm10Icon } = createAirSubValue(pm10);
  const { airValue: pm25Value, airIcon: pm25Icon } = createAirSubValue(pm25);

  return (
    <div className="header-container">
      <Status title="위치" value={city} subValue={subLocation}></Status>
      <Status
        title="온도"
        value={t1h}
        unit="°C"
        subValue={tempValue}
        subIcon={tempIcon}
      ></Status>
      <Status title="강수확률" value={rainProb} unit="%"></Status>
      <Status title="습도" value={humidity} unit="%"></Status>
      <Status
        title="PM10"
        value={pm10}
        unit="㎛"
        subValue={pm10Value}
        subIcon={pm10Icon}
      ></Status>
      <Status
        title="PM25"
        value={pm25}
        unit="㎛"
        subValue={pm25Value}
        subIcon={pm25Icon}
      ></Status>
    </div>
  );
};
