import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useObserver } from "mobx-react";
import { useStores } from "src/hooks";
import { Status } from "src/components/base";

import { ReactComponent as Up } from "src/images/up.svg";
import { ReactComponent as Down } from "src/images/down.svg";
import { ReactComponent as Smiling } from "src/images/smiling.svg";
import { ReactComponent as Smile } from "src/images/smile.svg";
import { ReactComponent as Sad } from "src/images/sad.svg";
import { ReactComponent as Angry } from "src/images/angry.svg";

const items = ["위치", "온도", "강수확률", "습도", "PM10", "PM25"];

const CurrentWeatherContainer = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

const initialDnDState: any = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

const createTempSubValue = (
  temp: number | null,
  yesterday_temp: number | null,
): { tempValue: string | null; tempIcon: string | JSX.Element | null } => {
  if (temp === null || yesterday_temp === null) return { tempValue: null, tempIcon: null };

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

const createAirSubValue = (air: string | null): { airValue: string | null; airIcon: JSX.Element | null } => {
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
  const [list, setList] = useState(items);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  useEffect(() => {
    getCurrentWeather();
  }, [getCurrentWeather]);

  const onDragStart = (e: SyntheticEvent<HTMLDivElement>) => {
    const initialPosition = Number(e.currentTarget.dataset.position);

    setDragAndDrop((prev: any) => ({
      ...prev,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    }));
  };

  const onDragOver = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();

    let newList = dragAndDrop.originalOrder;

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(e.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((_: string, index: number) => index !== draggedFrom);

    newList = [...remainingItems.slice(0, draggedTo), itemDragged, ...remainingItems.slice(draggedTo)];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = (e: SyntheticEvent<HTMLDivElement>) => {
    setList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  // useEffect(() => {
  //   console.log("Dragged From: ", dragAndDrop && dragAndDrop.draggedFrom);
  //   console.log("Dropping Into: ", dragAndDrop && dragAndDrop.draggedTo);
  // }, [dragAndDrop]);

  // useEffect(() => {
  //   console.log("List updated!", list);
  // }, [list]);

  const { city, r2, r3, t1h, yesterday_temp, pop, reh, pm10, pm25 } = currentWeather;

  const subLocation = r2 && r3 ? `${r2} ${r3}` : "-";
  const { tempValue, tempIcon } = createTempSubValue(t1h, yesterday_temp);
  const rainProb = pop !== null ? String(pop) : null;
  const humidity = reh !== null ? String(reh) : null;
  const { airValue: pm10Value, airIcon: pm10Icon } = createAirSubValue(pm10);
  const { airValue: pm25Value, airIcon: pm25Icon } = createAirSubValue(pm25);

  return (
    <CurrentWeatherContainer>
      {list.map((item: string, index: number) => {
        if (item === "위치") {
          return (
            <Status
              key={index}
              isDropArea={dragAndDrop && dragAndDrop.draggedTo === Number(index)}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              draggable
              position={index}
              title="위치"
              value={city}
              subValue={subLocation}
            />
          );
        } else if (item === "온도") {
          return (
            <Status
              key={index}
              isDropArea={dragAndDrop && dragAndDrop.draggedTo === Number(index)}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              draggable
              position={index}
              title="온도"
              value={t1h}
              unit="°C"
              subValue={tempValue}
              subIcon={tempIcon}
            />
          );
        } else if (item === "강수확률") {
          return (
            <Status
              key={index}
              isDropArea={dragAndDrop && dragAndDrop.draggedTo === Number(index)}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              draggable
              position={index}
              title="강수확률"
              value={rainProb}
              unit="%"
            />
          );
        } else if (item === "습도") {
          return (
            <Status
              key={index}
              isDropArea={dragAndDrop && dragAndDrop.draggedTo === Number(index)}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              draggable
              position={index}
              title="습도"
              value={humidity}
              unit="%"
            />
          );
        } else if (item === "PM10") {
          return (
            <Status
              key={index}
              isDropArea={dragAndDrop && dragAndDrop.draggedTo === Number(index)}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              draggable
              position={index}
              title="PM10"
              value={pm10}
              unit="㎛"
              subValue={pm10Value}
              subIcon={pm10Icon}
            />
          );
        } else if (item === "PM25") {
          return (
            <Status
              key={index}
              isDropArea={dragAndDrop && dragAndDrop.draggedTo === Number(index)}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              draggable
              position={index}
              title="PM25"
              value={pm25}
              unit="㎛"
              subValue={pm25Value}
              subIcon={pm25Icon}
            />
          );
        }
      })}
    </CurrentWeatherContainer>
  );
};
