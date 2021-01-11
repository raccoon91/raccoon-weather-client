import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useObserver } from "mobx-react";
import { useStores } from "src/hooks";
import { Weather } from "./WeatherValue";

const CurrentWeatherContainer = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

const Draggable = styled.div`
  cursor: pointer;
`;

const DropArea = styled.div`
  width: 160px;
  height: 105px;
`;

interface IDnDState {
  draggedFrom: number | null;
  draggedTo: number | null;
  isDragging: boolean;
  originalOrder: string[];
  updatedOrder: string[];
}

const initialDnDState: IDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

const useStoreData = () => {
  const {
    store: { weatherStore },
  } = useStores();

  return useObserver(() => ({
    getCurrentWeather: weatherStore.getCurrentWeather,
    weatherDataList: weatherStore.weatherDataList,
  }));
};

export const CurrentWeather: FC = () => {
  const { getCurrentWeather, weatherDataList } = useStoreData();
  const [itemList, setItemList] = useState(["위치", "온도", "강수확률", "습도", "PM10", "PM25"]);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  useEffect(() => {
    getCurrentWeather();
  }, [getCurrentWeather]);

  const onDragStart = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const initialPosition = Number(e.currentTarget.dataset.position);

    setDragAndDrop((prev: any) => ({
      ...prev,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: itemList,
    }));
  };

  const onDragOver = (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!dragAndDrop.draggedFrom) return;

    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
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

  const onDrop = () => {
    setItemList(dragAndDrop.updatedOrder);

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

  return (
    <CurrentWeatherContainer>
      {weatherDataList &&
        itemList.map((item, index: number) => {
          const { title, value, unit, subValue, subIcon } = weatherDataList[item];
          const { draggedTo } = dragAndDrop;

          return (
            <Draggable
              key={title}
              draggable
              data-position={index}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
            >
              {draggedTo !== null && draggedTo === Number(index) ? (
                <DropArea />
              ) : (
                <Weather title={title} value={value} unit={unit} subValue={subValue} subIcon={subIcon} />
              )}
            </Draggable>
          );
        })}
    </CurrentWeatherContainer>
  );
};
