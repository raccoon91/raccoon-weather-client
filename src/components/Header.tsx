import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { useStores } from "src/hooks";
import { Status } from "src/components";

const useWeatherStore = () => {
  const { store } = useStores();

  return useObserver(() => ({
    currentWeather: store.currentWeather,
  }));
};

export const Header: FC = () => {
  const { currentWeather } = useWeatherStore();
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
  const subTemp = yesterday_temp ? yesterday_temp : "-";

  return (
    <>
      <Status title="위치" value={city} subValue={subLocation}></Status>
      <Status title="온도" value={t1h} unit="°C" subValue={subTemp}></Status>
      <Status title="강수확률" value={pop} unit="%"></Status>
      <Status title="습도" value={reh} unit="%"></Status>
      <Status title="미세먼지(pm10)" value={pm10} unit="㎛"></Status>
      <Status title="미세먼지(pm25)" value={pm25} unit="㎛"></Status>
    </>
  );
};
